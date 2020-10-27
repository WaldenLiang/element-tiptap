<template>
  <div>
    <command-button
      :command="openEditLinkDialog"
      :enable-tooltip="et.tooltip"
      :tooltip="et.t('editor.extensions.Link.edit.tooltip')"
      icon="edit"
    />

    <el-dialog
      :title="et.t('editor.extensions.Link.edit.control.title')"
      :visible.sync="editLinkDialogVisible"
      :append-to-body="true"
      width="400px"
      custom-class="el-tiptap-edit-link-dialog"
    >
      <el-form
        :model="linkAttrs"
        label-position="right"
        size="small"
      >
        <el-form-item
          :label="et.t('editor.extensions.Link.edit.control.href')"
          prop="href"
        >
          <el-input v-model="linkAttrs.href"
                    autocomplete="off">
            <el-select v-model="linkType"
                       slot="prepend"
                       placeholder="Select"
                       style="width: 80px"
                       :popper-append-to-body="false">
              <el-option :label="et.t('editor.extensions.Link.edit.control.link_type.web')"
                         value="web" />
              <el-option :label="et.t('editor.extensions.Link.edit.control.link_type.mail')"
                         value="mail" />
              <el-option :label="et.t('editor.extensions.Link.edit.control.link_type.tel')"
                         value="tel" />
              <el-option :label="et.t('editor.extensions.Link.edit.control.link_type.sms')"
                         value="sms" />
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item v-if="linkType === 'web'"
                      prop="openInNewTab">
          <el-checkbox v-model="linkAttrs.openInNewTab">
            {{ et.t('editor.extensions.Link.edit.control.open_in_new_tab') }}
          </el-checkbox>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button
          size="small"
          round
          @click="closeEditLinkDialog"
        >
          {{ et.t('editor.extensions.Link.edit.control.cancel') }}
        </el-button>

        <el-button
          type="primary"
          size="small"
          round
          @mousedown.prevent
          @click="updateLinkAttrs"
        >
          {{ et.t('editor.extensions.Link.edit.control.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';
import { Dialog, Form, FormItem, Input, Select, Option, Checkbox, Button } from 'element-ui';
import { MenuData } from 'tiptap';
import CommandButton from '../CommandButton.vue';

@Component({
  components: {
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Select.name]: Select,
    [Option.name]: Option,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    CommandButton,
  },
})
export default class EditLinkCommandButton extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Prop({
    type: Object,
    required: true,
  })
  readonly initLinkAttrs!: { href: string, openInNewTab: boolean };

  @Inject() readonly et!: any;

  // linkAttrs = this.initLinkAttrs;
  linkAttrs = { href: '', openInNewTab: false };
  editLinkDialogVisible = false;
  linkType = 'web'

  private async created () {
    const _href = this.initLinkAttrs.href;
    if (/^(mailto:)/.test(_href)) {
      this.linkType = 'mail';
      this.linkAttrs.href = _href.substr(7);
      this.linkAttrs.openInNewTab = false;
    } else if (/^(tel:)/.test(_href)) {
      this.linkType = 'tel';
      this.linkAttrs.href = _href.substr(4);
      this.linkAttrs.openInNewTab = false;
    } else if (/^(sms:)/.test(_href)) {
      this.linkType = 'sms';
      this.linkAttrs.href = _href.substr(4);
      this.linkAttrs.openInNewTab = false;
    } else {
      this.linkType = 'web';
      this.linkAttrs = this.initLinkAttrs;
    }
  }

  private updateLinkAttrs () {
    const self = this;
    const _attrs = { ...{ href: '', openInNewTab: false }, ...self.linkAttrs };
    if (this.linkType === 'mail') {
      _attrs.href = `mailto:${_attrs.href}`;
    } else if (this.linkType === 'tel') {
      _attrs.href = `tel:${_attrs.href}`;
    } else if (this.linkType === 'sms') {
      _attrs.href = `tel:${_attrs.href}`;
    }
    this.editorContext.commands.link(_attrs);

    this.closeEditLinkDialog();
  }

  private openEditLinkDialog () {
    this.editLinkDialogVisible = true;
  }

  private closeEditLinkDialog () {
    this.editLinkDialogVisible = false;
  }
};
</script>
