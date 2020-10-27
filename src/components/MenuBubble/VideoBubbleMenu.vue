<template>
  <div class="video-bubble-menu">
    <inset-video-command-button
      :is-edit="true"
      :editor-context="editorContext" />

    <remove-video-command-button
      :editor-context="editorContext" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import InsetVideoCommandButton from '../MenuCommands/video/insetVideoCommandButton';
import RemoveVideoCommandButton from '../MenuCommands/video/RemoveVideoCommandButton';
import { MenuData } from 'tiptap';

@Component({
  components: {
    InsetVideoCommandButton,
    RemoveVideoCommandButton
  },
})
export default class VideoBubbleMenu extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;
};
</script>

<style lang="scss">
.video-bubble-menu {
  display: flex;
}
</style>
