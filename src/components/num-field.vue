<template lang="pug">
.NumField(:data-active="!!props.value" :data-inactive="props.inactive")
  .body
    .label {{translate(props.label)}}
    .input-group
      TextInput.text-input(
        :value="props.value"
        :line="true"
        :filter="valueFilter"
        @update:value="emit('update:value', $event)")
      SelectInput.unit-input(
        v-if="props.unitOpts && props.unitLabel"
        :value="validUnit"
        :opts="props.unitOpts"
        :label="props.unitLabel"
        :plurNum="props.value"
        @update:value="select")
  .note(v-if="props.note") {{props.note}}
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { translate } from 'src/dict'
import { InputOption } from 'src/types'
import TextInput from './text-input.vue'
import SelectInput from './select-input.vue'

interface NumFieldProps {
  label?: string
  value?: number | string
  or?: number | string
  inactive?: boolean
  unit?: string
  unitOpts?: readonly InputOption[]
  unitLabel?: string
  allowNegative?: boolean
  note?: string
}

const emit = defineEmits(['update:value', 'update:unit'])
const props = defineProps<NumFieldProps>()

const validUnit = computed((): string => {
  return !props.value ? 'none' : props.unit ?? 'none'
})

function valueFilter(e: Event): number | void {
  const target = e.target as HTMLInputElement
  let raw = target.value
  if (props.allowNegative && (raw === '-0' || raw === '0-')) {
    target.value = '-'
    return
  }
  const val = parseInt(raw)
  if (isNaN(val) || (!props.allowNegative && val < 0)) return 0
  return val
}
function select(unit: string): void {
  if (!props.inactive) emit('update:unit', unit)
}
</script>
