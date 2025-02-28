import * as Utils from 'src/utils'
import { Permissions } from 'src/services/permissions'
import { Settings } from 'src/services/settings'
import { Containers } from 'src/services/containers'
import { Store } from 'src/services/storage'
import { Info } from 'src/services/info'
import { Sidebar } from 'src/services/sidebar'
import { History } from 'src/services/history'
import { Bookmarks } from 'src/services/bookmarks'
import { SetupPage } from './setup-page'

/**
 * Retrieve current permissions
 */
export async function loadPermissions(): Promise<void> {
  const webReqPerms = ['webRequest', 'webRequestBlocking', 'proxy']
  const perms = await Promise.all([
    browser.permissions.contains({ origins: ['<all_urls>'], permissions: webReqPerms }),
    browser.permissions.contains({ permissions: ['tabHide'] }),
    browser.permissions.contains({ permissions: ['clipboardWrite'] }),
    browser.permissions.contains({ permissions: ['history'] }),
    browser.permissions.contains({ permissions: ['bookmarks'] }),
  ])
  Permissions.reactive.webData = perms[0]
  Permissions.reactive.tabHide = perms[1]
  Permissions.reactive.clipboardWrite = perms[2]
  Permissions.reactive.history = perms[3]
  Permissions.reactive.bookmarks = perms[4]

  if (!Permissions.reactive.webData) onRemovedAllUrls()
  if (!Permissions.reactive.tabHide) onRemovedTabHide()
  if (!Permissions.reactive.history) onRemovedHistory()
  if (!Permissions.reactive.bookmarks) onRemovedBookmarks()
}

export type RequestablePermission =
  | '<all_urls>'
  | 'tabHide'
  | 'clipboardWrite'
  | 'history'
  | 'bookmarks'

export async function request(...perms: RequestablePermission[]): Promise<boolean> {
  try {
    const origins: string[] = []
    const permissions: string[] = []

    if (perms.includes('<all_urls>')) {
      origins.push('<all_urls>')
      permissions.push('webRequest', 'webRequestBlocking', 'proxy')
      Utils.rmFromArray(perms, '<all_urls>')
    }

    permissions.push(...perms)
    return await browser.permissions.request({ origins, permissions })
  } catch {
    if (perms.includes('<all_urls>')) SetupPage.open('all-urls')
    else if (perms.includes('tabHide')) SetupPage.open('tab-hide')
    else if (perms.includes('history')) SetupPage.open('history')
    else if (perms.includes('bookmarks')) SetupPage.open('bookmarks')
    else if (perms.includes('clipboardWrite')) SetupPage.open('clipboard-write')
    return false
  }
}

function onAdded(info: browser.permissions.Permissions): void {
  const allUrls = info.origins?.includes('<all_urls>')
  const webReqPerms = ['webRequest', 'webRequestBlocking', 'proxy']
  const webReq = webReqPerms.every(s => info.permissions?.includes(s))
  if (allUrls && webReq) Permissions.reactive.webData = true
  if (info.permissions?.includes('tabHide')) Permissions.reactive.tabHide = true
  if (info.permissions?.includes('clipboardWrite')) Permissions.reactive.clipboardWrite = true
  if (info.permissions?.includes('history')) {
    Permissions.reactive.history = true
    onAddedHistory()
  }
  if (info.permissions?.includes('bookmarks')) {
    Permissions.reactive.bookmarks = true
    onAddedBookmarks()
  }
}

function onRemoved(info: browser.permissions.Permissions): void {
  const allUrls = info.origins?.includes('<all_urls>')
  const webReqPerms = ['webRequest', 'webRequestBlocking', 'proxy']
  const webReq = webReqPerms.some(s => info.permissions?.includes(s))
  if (allUrls || webReq) {
    Permissions.reactive.webData = false
    onRemovedAllUrls()
  }

  if (info.permissions?.includes('tabHide')) {
    Permissions.reactive.tabHide = false
    onRemovedTabHide()
  }

  if (info.permissions?.includes('clipboardWrite')) {
    Permissions.reactive.clipboardWrite = false
  }

  if (info.permissions?.includes('history')) {
    Permissions.reactive.history = false
    onRemovedHistory()
  }

  if (info.permissions?.includes('bookmarks')) {
    Permissions.reactive.bookmarks = false
    onRemovedBookmarks()
  }
}

export function setupListeners(): void {
  browser.permissions.onAdded.addListener(onAdded)
  browser.permissions.onRemoved.addListener(onRemoved)
}

export function resetListeners(): void {
  browser.permissions.onAdded.removeListener(onAdded)
  browser.permissions.onRemoved.removeListener(onRemoved)
}

/////////////
// WebData

function onRemovedAllUrls(): void {
  if (Info.isBg) onRemovedAllUrlsBg()
  else onRemovedAllUrlsFg()
}

function onRemovedAllUrlsBg(): void {
  let containersSaveNeeded = false
  let settingsSaveNeeded = false
  for (const c of Object.values(Containers.reactive.byId)) {
    if (c.proxified) {
      c.proxified = false
      containersSaveNeeded = true
    }
    if (c.proxy && c.proxy.type !== 'direct') {
      c.proxy.type = 'direct'
      containersSaveNeeded = true
    }
    if (c.includeHostsActive) {
      c.includeHostsActive = false
      containersSaveNeeded = true
    }
    if (c.excludeHostsActive) {
      c.excludeHostsActive = false
      containersSaveNeeded = true
    }
    if (c.userAgentActive) {
      c.userAgentActive = false
      containersSaveNeeded = true
    }
  }

  if (Settings.state.selWinScreenshots) {
    Settings.state.selWinScreenshots = false
    settingsSaveNeeded = true
  }

  if (containersSaveNeeded) {
    Store.set({ containers: Utils.cloneObject(Containers.reactive.byId) })
  }
  if (settingsSaveNeeded) {
    Settings.saveSettings()
  }
}

function onRemovedAllUrlsFg(): void {
  if (Info.isSetup) {
    for (const c of Object.values(Containers.reactive.byId)) {
      if (c.proxified) c.proxified = false
      if (c.proxy) c.proxy.type = 'direct'
      if (c.includeHostsActive) c.includeHostsActive = false
      if (c.excludeHostsActive) c.excludeHostsActive = false
      if (c.userAgentActive) c.userAgentActive = false
    }

    if (Settings.state.selWinScreenshots) {
      Settings.state.selWinScreenshots = false
    }
  }
}

/////////////
// TabHide

function onRemovedTabHide(): void {
  if (Info.isBg) onRemovedTabHideBg()
  else onRemovedTabHideFg()
}

function onRemovedTabHideBg(): void {
  let saveNeeded = false
  if (Settings.state.hideInact) {
    Settings.state.hideInact = false
    saveNeeded = true
  }
  if (Settings.state.hideFoldedTabs) {
    Settings.state.hideFoldedTabs = false
    saveNeeded = true
  }

  if (saveNeeded) {
    Settings.saveSettings()
  }
}

function onRemovedTabHideFg(): void {
  if (Info.isSetup) {
    Settings.state.hideInact = false
    Settings.state.hideFoldedTabs = false
  }
}

/////////////
// History

function onAddedHistory(): void {
  if (!Info.isBg) onAddedHistoryFg()
}

function onAddedHistoryFg(): void {
  if (Info.isSidebar) {
    if (!Sidebar.hasHistory) return

    const panel = Sidebar.reactive.panelsById.history
    if (!panel) return

    if (!panel.ready && Sidebar.reactive.activePanelId === 'history') History.load()
  }
}

function onRemovedHistory(): void {
  if (!Info.isBg) onRemovedHistoryFg()
}

function onRemovedHistoryFg(): void {
  if (Info.isSidebar) {
    History.unload()
  }
}

///////////////
// Bookmarks

function onAddedBookmarks(): void {
  if (!Info.isBg) onAddedBookmarksFg()
}

function onAddedBookmarksFg(): void {
  if (Info.isSidebar) {
    if (!Sidebar.hasBookmarks) return

    const panel = Sidebar.reactive.panels.find(p => Utils.isBookmarksPanel(p))
    if (!panel) return

    const actPanel = Sidebar.reactive.panelsById[Sidebar.reactive.activePanelId]
    if (!panel.ready && Utils.isBookmarksPanel(actPanel)) Bookmarks.load()
  }
}

function onRemovedBookmarks(): void {
  if (!Info.isBg) onRemovedBookmarksFg()
}

function onRemovedBookmarksFg(): void {
  if (Info.isSidebar) {
    Bookmarks.unload()
  }
}
