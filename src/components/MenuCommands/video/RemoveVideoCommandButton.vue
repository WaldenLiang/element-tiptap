<template>
  <command-button
    :command="removeVideo"
    :enable-tooltip="et.tooltip"
    tooltip="移除视频"
    icon="regular/trash-alt"
  />
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';
import CommandButton from '../CommandButton.vue';
import { MenuData } from 'tiptap';

@Component({
  components: {
    CommandButton,
  },
})
export default class RemoveVideoCommandButton extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Inject() readonly et!: any;

  private removeVideo () {
    this.editorContext.commands.removeNode();
  }
};
</script>
