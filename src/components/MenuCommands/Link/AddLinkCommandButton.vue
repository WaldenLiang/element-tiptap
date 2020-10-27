<template>
  <div>
    <command-button :is-active="editorContext.isActive.link()"
                    :readonly="et.isCodeViewMode"
                    :command="openAddLinkDialog"
                    :enable-tooltip="et.tooltip"
                    :tooltip="et.t('editor.extensions.Link.add.tooltip')"
                    icon="link" />

    <el-dialog :title="et.t('editor.extensions.Link.add.control.title')"
               :visible.sync="addLinkDialogVisible"
               :append-to-body="true"
               width="400px"
               custom-class="el-tiptap-edit-link-dialog">
      <el-form :model="linkAttrs"
               label-position="right"
               size="small">
        <el-form-item :label="et.t('editor.extensions.Link.add.control.href')"
                      prop="href">
          <!-- <el-input v-model="linkAttrs.href"
                    autocomplete="off" /> -->
          <el-input v-model="linkAttrs.href"
                    autocomplete="off">
            <el-select v-model="linkType"
                       slot="prepend"
                       placeholder="Select"
                       style="width: 80px"
                       :popper-append-to-body="false">
              <el-option :label="et.t('editor.extensions.Link.add.control.link_type.web')"
                         value="web" />
              <el-option :label="et.t('editor.extensions.Link.add.control.link_type.mail')"
                         value="mail" />
              <el-option :label="et.t('editor.extensions.Link.add.control.link_type.tel')"
                         value="tel" />
              <el-option :label="et.t('editor.extensions.Link.add.control.link_type.sms')"
                         value="sms" />
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item v-if="linkType === 'web'"
                      prop="openInNewTab">
          <el-checkbox v-model="linkAttrs.openInNewTab">
            {{ et.t('editor.extensions.Link.add.control.open_in_new_tab') }}
          </el-checkbox>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button size="small"
                   round
                   @click="closeAddLinkDialog">
          {{ et.t('editor.extensions.Link.add.control.cancel') }}
        </el-button>

        <el-button type="primary"
                   size="small"
                   round
                   @mousedown.prevent
                   @click="addLink">
          {{ et.t('editor.extensions.Link.add.control.confirm') }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';
import {
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Checkbox,
  Button,
} from 'element-ui';
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
export default class AddLinkCommandButton extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  readonly editorContext!: MenuData;

  @Inject() readonly et!: any;

  linkAttrs = {};

  addLinkDialogVisible = false;

  linkType = 'web'

  @Watch('addLinkDialogVisible', { immediate: true })
  onDialogVisibleChange () {
    this.linkAttrs = { href: '', openInNewTab: false };
  }

  private addLink () {
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

    this.closeAddLinkDialog();
  }

  private openAddLinkDialog () {
    this.addLinkDialogVisible = true;
  }

  private closeAddLinkDialog () {
    this.addLinkDialogVisible = false;
  }
}
</script>
