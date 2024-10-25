<template>
  <div class="mde-container" :style="containerStyle">
    <textarea ref="editorRef"></textarea>
  </div>
  <button @click="updateNum()">setReadOnly</button>
  <button @click="getValue()">getValue</button>
</template>

<script setup>
import EasyMDE from 'easymde'
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

const num = ref(1)
const updateNum = () => {
  const read = num.value % 2 === 0
  num.value++
  setReadOnly(read)
}
const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '400px'
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(['update:modelValue'])
let easyMDE = null;
const editorConfig = {
  autofocus: false,
  spellChecker: false, //拼写检查器，输入中文会提示拼写错误
  status: false,  //隐藏状态栏（会有提示问题和输入字符数量等）
  uploadImage: true,
  imagePathAbsolute: true,
  toolbar: ["bold", "italic", "heading", "|", "unordered-list", "ordered-list", "|", "code", "link", "table", "upload-image", "|", "preview", "side-by-side", "fullscreen", "|", "guide"],
  imageUploadFunction: function(file, onSuccess, onError) {
      var formData = new FormData();
      formData.append('richtext', file); // 'image' 是服务器端接收文件的参数名

      // 使用 fetch API 发送图片上传请求
      fetch('/v1/api/richtext_image', {
          method: 'POST',
          headers: {
              // 添加你需要的请求头
              'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDUyMzE4NTAsImlhdCI6MTcwNTAzMTg1MCwibmJmIjoxNzA1MDMxODUwLCJ1c2VybmFtZSI6ImphbmZhbmcifQ.2aYDTbqmWzKz7fAk9DeHNrVeRiPPHu8h9jB2MCCznTA',
              // 其他可能需要的请求头...
          },
          body: formData,
      })
      .then(response => response.json())
      .then(data => {
        const id = data.id;
          // 上传成功，调用 onSuccess 并传递图片的 URL
          if (data.status_code === 200) {
            const imageUrl = `https://test-tr.futuoa.com/v1/api/richtext_image/${id}`
              //使用onSuccess传的url会有问题，如果url后缀不是图片后缀（如.png结尾）会被认为是链接，所以这里通过手动插入图片的方式解决
              //onSuccess(imageUrl);
              const imageMarkdown = `![Image](${imageUrl})`;
              // 获取当前编辑器的光标位置
              const cm = easyMDE.codemirror;
              const output = cm.getSelection();
              if (output.length) {
                  // 如果当前已经有选中的文本，将其替换为图片 Markdown
                  cm.replaceSelection(imageMarkdown);
              } else {
                  // 如果没有选中的文本，直接插入图片 Markdown
                  cm.replaceRange(imageMarkdown, cm.getCursor());
              }
          } else {
              // 触发错误回调
              onError(data.message);
          }
      })
      .catch(error => {
          // 网络或其他错误，触发错误回调
          onError(error.message);
      });
  },
}
const editorRef = ref();
const containerStyle = computed(() => {
  return {
    width: props.width,
    height: props.height
  }
})
// 检查编辑器是否处于预览模式
function isPreviewMode(mde) {
    // 获取编辑器的 CodeMirror 容器元素
    var cmWrapper = mde.codemirror.getWrapperElement();
    const el = cmWrapper.querySelector('.editor-preview-active')
    // 检查容器元素是否有 'editor-preview-active' 类
    return el ? true : false;
}
/**
 * 是否设置成只读模式
 * @param {*} readOnly - boolean
 */
function setReadOnly(readOnly = true) {
  if(!easyMDE) return
  const isReadOnlyNow = isPreviewMode(easyMDE)
  if(readOnly && !isReadOnlyNow) {
     //当前是只读模式，且要设置成非只读模式
    easyMDE.togglePreview()
  } else if (!readOnly && isReadOnlyNow) {
    //当前是非只读模式，且要设置成只读模式
    easyMDE.togglePreview()
  }
  
}
function getValue() {
  if(!easyMDE) return
  console.log(JSON.stringify(easyMDE.value()))
  return easyMDE.value()
}

watch(
  () => props.modelValue,
  (val) => {
    if(!easyMDE || val === getValue()) return
    easyMDE.value(val)
  }
)

onMounted(() => {
  easyMDE = new EasyMDE({
    element: editorRef.value,
    ...editorConfig,
    initialValue: props.modelValue,
    //readOnly: props.readOnly
  });
  if(props.readOnly) {
    setReadOnly(true)
  }
  easyMDE.codemirror.on("change", () => {
    emit('update:modelValue', easyMDE.value())
  });
})
onBeforeUnmount(() => {
  easyMDE.toTextArea();
  easyMDE = null
})

</script>

<style scoped>

</style>