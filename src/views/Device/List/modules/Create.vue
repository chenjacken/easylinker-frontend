<template>
  <a-modal
    destroyOnClose
    :title="JSON.stringify(editValue)==='{}'?'新建设备':'更新设备'"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item
        v-if="editValue.sn"
        label="序列号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          disabled
          v-decorator="['sn']"
        />
      </a-form-item>
      <a-form-item
        label="设备名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          placeholder="请输入设备名称"
          v-decorator="['name', {rules: [{required: true, message: '请输入设备名称！'}]}]"
        />
      </a-form-item>
      <a-form-item
        label="设备类型"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          showSearch
          :disabled="editValue.sn !== undefined"
          placeholder="请选择设备类型"
          @change="handleSelectDeviceType"
          v-decorator="['deviceType', {rules: [{required: true, message: '请选择设备类型！'}]}]"
        >
          <a-select-option
            v-for="item in deviceTypeMap"
            :key="item.key"
          >{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="协议类型"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          showSearch
          :disabled="editValue.sn !== undefined || deviceProtocolMap.length <= 0"
          placeholder="请选择协议类型"
          v-decorator="['deviceProtocol',{rules: [{required: true, message: '请选择协议类型！'}]}]"
        >
          <a-select-option
            v-for="item in deviceProtocolMap"
            :key="item.key"
          >{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="数据字段"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          v-decorator="['dataFields']"
          mode="tags"
          style="width: 100%"
          @change="handleFieldChange"
          placeholder="输入设备的数据字段，按回车完成"
        ></a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <span slot="label">
          设备参数&nbsp;
          <a-tooltip title="What do you want others to call you?">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-select
          v-decorator="['deviceParam']"
          mode="tags"
          style="width: 100%"
          @change="handleFieldChange"
          placeholder="输入设备的参数，按回车完成"
        ></a-select>
      </a-form-item>
      <a-form-item
        label="所属场景"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          showSearch
          v-decorator="['sceneSecurityId']"
          placeholder="请选择设备所属场景"
        >
          <a-select-option
            v-for="item in sceneSecurityIdMap"
            :key="item.key"
          >{{ item.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="设备描述"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea
          placeholder="请输入设备描述"
          :autosize="{ minRows: 2, maxRows: 6 }"
          v-decorator="['info']"
        />
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button
        key="cancel"
        @click="handleCancel"
      >取消</a-button>
      <a-button
        key="forward"
        :loading="confirmLoading"
        type="primary"
        @click="handleSubmit"
      >保存</a-button>
    </template>
  </a-modal>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { queryProtocolByType } from '@/api/device'
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
      confirmLoading: false,
      visible: false,
      editValue: {},
      form: this.$form.createForm(this),
      deviceProtocolMap: []
    }
  },
  computed: {
    ...mapState({
      deviceTypeMap: state => state.device.deviceTypeMap
      // deviceProtocolMap: state => state.device.deviceProtocolMap
    }),
    ...mapGetters(['sceneSecurityIdMap'])
  },
  methods: {
    ...mapActions(['AddDevice', 'UpdateDevice']),
    create () {
      this.visible = true
    },
    edit (record) {
      const { sn, name, info, securityId, deviceType, deviceProtocol, dataFields } = record
      this.visible = true
      this.editValue = record
      setTimeout(_ =>
        this.form.setFieldsValue({
          sn,
          name,
          info,
          deviceType,
          deviceProtocol,
          dataFields,
          sceneSecurityId: securityId
        })
      )
    },
    handleCancel () {
      this.visible = false
      this.editValue = {}
      this.deviceProtocolMap = []
      this.form.resetFields()
    },

    /**
     * @description 处理设备类型选择事件，关联设备类型支持的协议类型
     * @param { string } value 选中的设备类型
     */
    async handleSelectDeviceType (value) {
      const { data } = await queryProtocolByType(value)
      this.deviceProtocolMap = data
    },

    handleFieldChange () { },
    handleSubmit () {
      const {
        AddDevice,
        UpdateDevice,
        form: { validateFields }
      } = this

      validateFields((errors, values) => {
        if (!errors) {
          if (this.editValue.sn) {
            UpdateDevice(values).then(res => {
              this.confirmLoading = false
              this.visible = false
              this.$emit('ok', values)
            })
          } else {
            AddDevice(values).then(res => {
              this.confirmLoading = false
              this.visible = false
              this.$emit('ok', values)
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style>
</style>
