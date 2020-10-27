<template>
  <div>
    <command-button
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.Image.buttons.insert_image.tooltip')"
      :readonly="et.isCodeViewMode"
      icon="video"
      :command="openUrlPrompt"
    />

    <el-dialog
      title="插入视频"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="400px"
      custom-class="el-tiptap-edit-image-dialog"
      @open="syncAttrs">
      <el-form
        :model="attrs"
        label-position="top"
        size="small">
        <el-form-item label="填写视频地址">
          <el-input
            v-model="attrs.src"
            autocomplete="off"
            :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="视频封面">
          <el-input
            v-model="attrs.post"
            autocomplete="off"
            placeholder="通常不用填写" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="attrs.controls">
            显示播放控件
          </el-checkbox>
          <el-checkbox v-model="attrs.autoplay">
            自动播放
          </el-checkbox>
          <el-checkbox v-model="attrs.muted">
            视频静音
          </el-checkbox>
          <el-checkbox v-model="attrs.loop">
            循环播放
          </el-checkbox>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button
          size="small"
          round
          @click="closeEditImageDialog">
          {{ et.t('editor.extensions.Image.control.edit_image.cancel') }}
        </el-button>

        <el-button
          type="primary"
          size="small"
          round
          @click="updateImageAttrs">
          插入
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';
import { Dialog, Button, Form, FormItem, Checkbox, Input } from 'element-ui';
import { MenuData } from 'tiptap';
import CommandButton from '../CommandButton.vue';

@Component({
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Checkbox.name]: Checkbox,
    CommandButton,
  },
})
export default class VideoCommandButton extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Prop({
    type: Boolean,
    required: false,
  })
  readonly isEdit!: Boolean;

  dialogVisible = false;
  attrs = this.getVideoAttrs();

  @Inject() readonly et!: any;

  openUrlPrompt (): void {
    this.dialogVisible = true;
  }

  private syncAttrs () {
    this.attrs = this.getVideoAttrs();
  }

  private getVideoAttrs () {
    return this.editorContext.getNodeAttrs('video');
  }

  private closeEditImageDialog () {
    this.dialogVisible = false;
  }

  private updateImageAttrs () {
    if (this.attrs.src) {
      if (this.isEdit) {
        this.editorContext.commands.updateNode(this.attrs);
      } else {
        this.editorContext.commands.video(this.attrs);
      }
      this.closeEditImageDialog();
    }
  }
};
</script>
