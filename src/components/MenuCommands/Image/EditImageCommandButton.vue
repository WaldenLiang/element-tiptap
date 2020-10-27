<template>
  <div>
    <command-button
      :command="openEditImageDialog"
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.Image.buttons.image_options.tooltip')"
      icon="ellipsis-h" />

    <el-dialog
      :title="et.t('editor.extensions.Image.control.edit_image.title')"
      :visible.sync="editImageDialogVisible"
      :append-to-body="true"
      width="400px"
      custom-class="el-tiptap-edit-image-dialog"
      @open="syncImageAttrs">
      <el-form
        :model="imageAttrs"
        label-position="top"
        size="small">
        <el-form-item :label="et.t('editor.extensions.Image.control.edit_image.form.src')">
          <el-input
            :value="imageAttrs.src"
            autocomplete="off"
            disabled />
        </el-form-item>

        <el-form-item :label="et.t('editor.extensions.Image.control.edit_image.form.alt')">
          <el-input
            v-model="imageAttrs.alt"
            autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-col :span="11">
            <el-form-item :label="et.t('editor.extensions.Image.control.edit_image.form.width')">
              <el-input
                v-model="imageAttrs.width"
                type="number" />
            </el-form-item>
          </el-col>
          <el-col
            :span="11"
            :push="2">
            <el-form-item :label="et.t('editor.extensions.Image.control.edit_image.form.height')">
              <el-input
                v-model="imageAttrs.height"
                type="number" />
            </el-form-item>
          </el-col>
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
          {{ et.t('editor.extensions.Image.control.edit_image.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';
import { Dialog, Form, FormItem, Input, Col, Button } from 'element-ui';
import CommandButton from '../CommandButton.vue';
import { MenuData } from 'tiptap';

@Component({
  components: {
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Col.name]: Col,
    [Button.name]: Button,
    CommandButton,
  },
})
export default class EditImageCommandButton extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Prop({
    type: Object,
    required: true,
  })
  readonly initAttrs!: { url: string, alt: string, display: string, width: any, height: any };

  @Inject() readonly et!: any;

  editImageDialogVisible = false;

  imageAttrs = this.getImageAttrs();

  private syncImageAttrs () {
    this.imageAttrs = this.getImageAttrs();
  }

  private getImageAttrs () {
    return { ...this.initAttrs };
  }

  private updateImageAttrs () {
    let { width, height } = this.imageAttrs;

    // input converts it to string
    width = parseInt(width as string, 10);
    height = parseInt(height as string, 10);

    this.editorContext.commands.updateNode(Object.assign(this.initAttrs, {
      alt: this.imageAttrs.alt,
      width: width >= 0 ? width : null,
      height: height >= 0 ? height : null,
    }));

    this.closeEditImageDialog();
  }

  private openEditImageDialog () {
    this.editImageDialogVisible = true;
  }

  private closeEditImageDialog () {
    this.editImageDialogVisible = false;
  }
};
</script>
