import { SettingsState } from '../types/settings'

export const DEFAULT_SETTINGS: SettingsState = {
  // General
  nativeScrollbars: false,
  nativeScrollbarsThin: true,
  nativeScrollbarsLeft: false,
  selWinScreenshots: false,
  updateSidebarTitle: true,
  markWindow: false,
  markWindowPreface: '[Sidebery] ',

  // Context menu
  ctxMenuNative: false,
  ctxMenuRenderInact: true,
  ctxMenuRenderIcons: true,
  ctxMenuIgnoreContainers: '',

  // Nav bar
  navBarLayout: 'horizontal',
  navBarInline: true,
  navBarSide: 'left',
  hideAddBtn: false,
  hideSettingsBtn: false,
  navBtnCount: true,
  hideEmptyPanels: true,
  navActTabsPanelLeftClickAction: 'none',
  navActBookmarksPanelLeftClickAction: 'none',
  navTabsPanelMidClickAction: 'none',
  navBookmarksPanelMidClickAction: 'none',
  navSwitchPanelsWheel: true,

  // Group page
  groupLayout: 'grid',

  // Panels
  skipEmptyPanels: false,

  // Drag and drop
  dndTabAct: true,
  dndTabActDelay: 750,
  dndTabActMod: 'none',
  dndExp: 'pointer',
  dndExpDelay: 750,
  dndExpMod: 'none',
  dndOutside: 'win',

  // Search
  searchBarMode: 'dynamic',

  // Tabs
  warnOnMultiTabClose: 'collapsed',
  activateLastTabOnPanelSwitching: true,
  showTabRmBtn: true,
  hideInact: false,
  activateAfterClosing: 'next',
  activateAfterClosingGlobal: false,
  activateAfterClosingNoFolded: true,
  activateAfterClosingNoDiscarded: true,
  askNewBookmarkPlace: true,
  tabsRmUndoNote: true,
  nativeHighlight: false,
  tabsUnreadMark: false,
  tabsUpdateMark: 'all',
  tabsReloadLimit: 5,
  tabsReloadLimitNotif: true,
  showNewTabBtns: true,
  newTabBarPosition: 'after_tabs',
  tabsPanelSwitchActMove: false,
  tabsUrlInTooltip: 'full',
  openSubPanelOnMouseHover: false,
  colorizeTabs: false,
  colorizeTabsSrc: 'domain',

  // New tab position
  moveNewTabPin: 'start',
  moveNewTabParent: 'last_child',
  moveNewTabParentActPanel: false,
  moveNewTab: 'end',
  moveNewTabActivePin: 'start',

  // Pinned tabs
  pinnedTabsPosition: 'panel',
  pinnedTabsList: false,
  pinnedAutoGroup: false,

  // Tabs tree
  tabsTree: true,
  groupOnOpen: true,
  tabsTreeLimit: 'none',
  hideFoldedTabs: false,
  hideFoldedParent: 'none',
  autoFoldTabs: false,
  autoFoldTabsExcept: 'none',
  autoExpandTabs: false,
  rmChildTabs: 'none',
  tabsChildCount: true,
  tabsLvlDots: true,
  discardFolded: false,
  discardFoldedDelay: 0,
  discardFoldedDelayUnit: 'sec',
  tabsTreeBookmarks: true,
  treeRmOutdent: 'branch',
  colorizeTabsBranches: false,
  colorizeTabsBranchesSrc: 'url',

  // Bookmarks
  warnOnMultiBookmarkDelete: 'collapsed',
  autoCloseBookmarks: false,
  autoRemoveOther: false,
  highlightOpenBookmarks: false,
  activateOpenBookmarkTab: false,
  showBookmarkLen: false,
  bookmarksRmUndoNote: true,
  loadBookmarksOnDemand: true,
  pinOpenedBookmarksFolder: true,

  // History
  loadHistoryOnDemand: true,

  // Appearance
  fontSize: 'm',
  animations: true,
  animationSpeed: 'norm',
  theme: 'proton',
  density: 'default',
  colorScheme: 'ff',
  sidebarCSS: false,
  groupCSS: false,

  // Snapshots
  snapNotify: true,
  snapExcludePrivate: false,
  snapInterval: 0,
  snapIntervalUnit: 'min',
  snapLimit: 0,
  snapLimitUnit: 'snap',

  // Mouse
  hScrollAction: 'none',
  navSwitchPanelsDelay: 128,
  scrollThroughTabs: 'none',
  scrollThroughVisibleTabs: false,
  scrollThroughTabsSkipDiscarded: false,
  scrollThroughTabsExceptOverflow: true,
  scrollThroughTabsCyclic: false,
  scrollThroughTabsScrollArea: 0,
  autoMenuMultiSel: true,
  multipleMiddleClose: false,
  longClickDelay: 500,
  wheelThreshold: false,
  wheelThresholdX: 10,
  wheelThresholdY: 60,
  tabDoubleClick: 'none',
  tabsSecondClickActPrev: true,
  shiftSelAct: true,
  activateOnMouseUp: false,
  tabLongLeftClick: 'none',
  tabLongRightClick: 'none',
  tabCloseMiddleClick: 'close',
  tabsPanelLeftClickAction: 'none',
  tabsPanelDoubleClickAction: 'tab',
  tabsPanelRightClickAction: 'menu',
  tabsPanelMiddleClickAction: 'tab',
  newTabMiddleClickAction: 'new_child',
  bookmarksLeftClickAction: 'open_in_act',
  bookmarksLeftClickActivate: false,
  bookmarksLeftClickPos: 'default',
  bookmarksMidClickAction: 'open_in_new',
  bookmarksMidClickActivate: false,
  bookmarksMidClickPos: 'default',

  // Sync
  syncName: '',
  syncSaveSettings: false,
  syncSaveCtxMenu: false,
  syncSaveStyles: false,
  syncSaveKeybindings: false,
}

// prettier-ignore
export const SETTINGS_OPTIONS = {
  navActTabsPanelLeftClickAction: ['new_tab', 'none'],
  navActBookmarksPanelLeftClickAction: ['scroll', 'none'],
  navTabsPanelMidClickAction: ['rm_act_tab', 'rm_all', 'discard', 'bookmark', 'convert', 'none'],
  navBookmarksPanelMidClickAction: ['convert', 'none'],
  tabsUrlInTooltip: ['full', 'stripped', 'none'],
  groupLayout: ['grid', 'list'],
  hScrollAction: ['switch_panels', 'switch_act_tabs', 'none'],
  scrollThroughTabs: ['panel', 'global', 'none'],
  discardFoldedDelayUnit: ['sec', 'min'],
  tabDoubleClick: ['reload', 'duplicate', 'pin', 'mute', 'clear_cookies', 'exp', 'new_after',
    'new_child', 'close', 'none'],
  tabLongLeftClick: ['reload', 'duplicate', 'pin', 'mute', 'clear_cookies', 'new_after',
    'new_child', 'none'],
  tabLongRightClick: ['reload', 'duplicate', 'pin', 'mute', 'clear_cookies', 'new_after',
    'new_child', 'none'],
  tabCloseMiddleClick: ['close', 'discard'],
  tabsPanelLeftClickAction: ['prev', 'expand', 'parent', 'none'],
  tabsPanelDoubleClickAction: ['collapse', 'tab', 'undo', 'none'],
  tabsPanelRightClickAction: ['next', 'expand', 'parent', 'menu', 'none'],
  tabsPanelMiddleClickAction: ['rm_act_tab', 'tab', 'undo', 'none'],
  newTabAction: ['new_child', 'reopen'],
  bookmarksLeftClickAction: ['open_in_act', 'open_in_new'],
  bookmarksNewTabPos: ['default', 'after'],
  bookmarksMidClickAction: ['open_in_new', 'edit', 'delete'],
  activateAfterClosing: ['prev_act', 'next', 'prev', 'none'],
  tabsUpdateMark: ['all', 'pin', 'norm', 'none'],
  pinnedTabsPosition: ['panel', 'top', 'left', 'right'],
  tabsTreeLimit: [1, 2, 3, 4, 5, 'none'],
  hideFoldedParent: ['any', 'group', 'none'],
  rmChildTabs: ['all', 'folded', 'none'],
  fontSize: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
  theme: ['proton', 'plain'],
  density: ['compact', 'default'],
  colorScheme: ['dark', 'light', 'sys', 'ff'],
  snapIntervalUnit: ['min', 'hr', 'day'],
  snapLimitUnit: ['snap', 'kb', 'day'],
  moveNewTabPin: ['start', 'end'],
  moveNewTabParent: [
    'before', 'sibling', 'first_child', 'last_child', 'start', 'end', 'default', 'none'
  ],
  moveNewTab: ['start', 'end', 'before', 'after', 'first_child', 'last_child', 'none'],
  moveNewTabActivePin: ['start', 'end'],
  warnOnMultiTabClose: ['any', 'collapsed', 'none'],
  warnOnMultiBookmarkDelete: ['any', 'collapsed', 'none'],
  navBarLayout: ['horizontal', 'vertical', 'hidden'],
  navBarSide: ['left', 'right'],
  navBarHorLayout: ['inline', 'wrap'],
  navBarVertLayout: ['left', 'right'],
  autoFoldTabsExcept: [1, 2, 3, 4, 5, 'none'],
  dndTabActMod: ['alt', 'shift', 'ctrl', 'none'],
  dndExp: ['pointer', 'hover', 'none'],
  dndExpMod: ['alt', 'shift', 'ctrl', 'none'],
  dndOutside: ['win', 'data'],
  animationSpeed: ['fast', 'norm', 'slow'],
  treeRmOutdent: ['branch', 'first_child'],
  colorizeTabsSrc: ['domain', 'container'],
  colorizeTabsBranchesSrc: ['url', 'domain'],
  searchBarMode: ['static', 'dynamic', 'none'],
  newTabBarPosition: ['after_tabs', 'bottom'],
} as const
