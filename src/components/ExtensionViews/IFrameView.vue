<template>
  <div class="iframe">
    <iframe class="iframe__embed"
            :src="src" />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

@Component
export default class IFrameView extends Vue {
  @Prop({
    type: ProsemirrorNode,
    required: true,
  })
  readonly node!: ProsemirrorNode;

  @Prop({
    type: Object,
    required: true,
  })
  readonly view!: EditorView;

  @Prop({
    type: Function,
    required: true,
  })
  readonly updateAttrs!: Function;

  get src (): string {
    return this.node.attrs.src;
  }

  set src (src) {
    this.updateAttrs({
      src,
    });
  }
};
</script>
