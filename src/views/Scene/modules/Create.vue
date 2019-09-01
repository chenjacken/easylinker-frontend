<template>
  <a-modal title="新建场景" :width="640" :visible="visible" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="场景名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['name', {rules: [{required: true, message: '请输入场景名称！'}]}]" />
        </a-form-item>
        <a-form-item label="场景类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['sceneType']" @change="handlesceneTypeMapChange">
            <a-select-option
              v-for="item in sceneTypeMap"
              :key="item.key"
              :value="item.key"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="场景模板" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            v-decorator="['preInstallTemplate',{
              initialValue: preInstallTemplateMap && preInstallTemplateMap[0] && preInstallTemplateMap[0].key
            }]"
            :disabled="preInstallTemplateDisabled"
          >
            <a-select-option
              v-for="item in preInstallTemplateMap"
              :key="item.key"
              :value="item.key"
            >{{ item.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            v-decorator="['info', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      preInstallTemplateDisabled: true,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    ...mapState({
      preInstallTemplateMap: state => state.scene.preInstallTemplateMap,
      sceneTypeMap: state => state.scene.sceneTypeMap
    })
  },
  methods: {
    ...mapActions(['AddScene']),
    create () {
      this.visible = true
    },
    resetForm () {
      const { preInstallTemplateMap } = this
      this.preInstallTemplateDisabled = true
      this.form.setFieldsValue({ preInstallTemplate: preInstallTemplateMap[0] && preInstallTemplateMap[0].key })
      this.form.resetFields()
    },
    handlesceneTypeMapChange (e) {
      const { preInstallTemplateMap } = this
      // TODO 后续扩展情况
      if (e === 'CUSTOM') {
        this.preInstallTemplateDisabled = true
        this.form.setFieldsValue({ preInstallTemplate: preInstallTemplateMap[0] && preInstallTemplateMap[0].key })
      } else this.preInstallTemplateDisabled = false
    },
    handleSubmit () {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          this.AddScene(values).then(res => {
            this.confirmLoading = false
            this.visible = false
            this.resetForm()
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

<style>
</style>
