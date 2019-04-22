<template>
  <div>
    <default :title="title" :content="content" :types="types">
      <list-view-component v-if="listData.length" :data="listData"></list-view-component>
    </default>
  </div>
</template>

<script>
import Default from "./Default.vue";
import ListViewComponent from "components/bs_base/listview/listview.vue";
export default {
  data() {
    return {
      title: "bs-联动视图组件",
      listData: []
    };
  },
  methods: {
    getListData() {
      //   this.$refs.listview.show()
      this.listData = [
        {
          title: "热门",
          items: [
            {
              name: "热热热热热热热热热1"
            },
            {
              name: "热热热热热热热热热2"
            },
            {
              name: "热热热热热热热热热3"
            },
            {
              name: "热热热热热热热热热4"
            },
            {
              name: "热热热热热热热热热5"
            },
            {
              name: "热热热热热热热热热6"
            }
          ]
        },
        {
          title: "A",
          items: [
            {
              name: "AAAAAAAAA1"
            },
            {
              name: "AAAAAAAAA2"
            },
            {
              name: "AAAAAAAAA3"
            },
            {
              name: "AAAAAAAAA4"
            },
            {
              name: "AAAAAAAAA5"
            },
            {
              name: "AAAAAAAAA6"
            }
          ]
        },
        {
          title: "B",
          items: [
            {
              name: "BBBBBBBBBBBBBB1"
            },
            {
              name: "BBBBBBBBBBBBBB2"
            },
            {
              name: "BBBBBBBBBBBBBB3"
            },
            {
              name: "BBBBBBBBBBBBBB4"
            },
            {
              name: "BBBBBBBBBBBBBB5"
            },
            {
              name: "BBBBBBBBBBBBBB6"
            }
          ]
        },
        {
          title: "D",
          items: [
            {
              name: "ddddddddddddd1"
            },
            {
              name: "ddddddddddddd2"
            },
            {
              name: "ddddddddddddd3"
            },
            {
              name: "ddddddddddddd4"
            },
            {
              name: "ddddddddddddd5"
            },
            {
              name: "ddddddddddddd6"
            }
          ]
        },
        {
          title: "E",
          items: [
            {
              name: "eeeeeeeee1"
            },
            {
              name: "eeeeeeeee2"
            },
            {
              name: "eeeeeeeee3"
            },
            {
              name: "eeeeeeeee4"
            },
            {
              name: "eeeeeeeee5"
            },
            {
              name: "eeeeeeeee6"
            }
          ]
        },
        {
          title: "F",
          items: [
            {
              name: "fffffff1"
            },
            {
              name: "fffffff2"
            },
            {
              name: "fffffff3"
            },
            {
              name: "fffffff4"
            },
            {
              name: "fffffff5"
            },
            {
              name: "fffffff6"
            },
            {
              name: "fffffff1"
            },
            {
              name: "fffffff2"
            },
            {
              name: "fffffff3"
            },
            {
              name: "fffffff4"
            },
            {
              name: "fffffff5"
            },
            {
              name: "fffffff6"
            },
            {
              name: "fffffff1"
            },
            {
              name: "fffffff2"
            },
            {
              name: "fffffff3"
            },
            {
              name: "fffffff4"
            },
            {
              name: "fffffff5"
            },
            {
              name: "fffffff6"
            }
          ]
        }
      ];
    }
  },
  created() {
    this.content = [
      {
        cont: "视图联动窗口"
      },
      {
        cont:
          `接受数据格式如下: 
            [{
                title:'String',
                items:[{
                    name:'string',
                    ...otherMsg
                }]
            }]`
      },
      {
        cont: "左右联动, 右侧快速操作入口"
      }
    ];
    this.types = [
      {
        desc: "基于better-scroll的视图联动窗口"
      }
    ];
    this.getListData();
  },
  components: {
    Default,
    ListViewComponent
  }
};
</script>


<style lang="stylus" scoped></style>

