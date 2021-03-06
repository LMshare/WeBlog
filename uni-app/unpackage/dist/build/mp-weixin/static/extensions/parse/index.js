Component({
	properties: {
		/**     
		 * 文章内容
		 */
		'content': {
			type: String,
			value: ''
		}
	},
	data() {
		article: {}
	},
	methods: {
		tap(e) {
			let element = e.currentTarget.dataset.data
			console.log("点击", element)
			if (element.tag == 'view' && element.child[0].tag == 'img') {
				let img = element.child[0]
				wx.previewImage({
					current: img.attr.src, // 当前显示图片的http链接
					urls: [img.attr.src] // 需要预览的图片http链接列表
				})
			} else if (element.tag == 'navigator') {
				console.log(element)
				wx.showModal({
					title: "外部链接提示",
					content: "这是一个外部链接,需要复制到浏览器中打开. 是否复制?",
					confirmText: "复制链接",
					success: res => {
						if (res.confirm) {
							wx.setClipboardData({
								data: element.attr.href
							});
						}
					}
				})
			}
		},
	},
	lifetimes: {
		attached() {
			let towxml = require('/towxml/index')
			// 处理meting
			let text = this.data.content.replace(
				/\[Meting\].*?\[Music.*?title="(.*?)".*?author="(.*?)".*?url="(.*?)".*?pic="(.*?)".*?\/\].*?\[\/Meting\]/s,
				"<audio autoplay='true' loop='true' name='$1' author='$2' poster='$4' src='$3'></audio>")
			// 处理<!-- -->
			text = text.replace(
				/<!--(.*?)-->/g,
				"")
			let result = towxml(text, 'markdown', {
				base: "https://www.thinkmoon.cn", // 相对资源的base路径
				events: { // 为元素绑定的事件方法
					tap: (e) => {
						this.tap(e)
					}
				}
			});
			// 更新解析数据
			this.setData({
				article: result,
				isLoading: false
			});

			//   this['event_bind_tap'] = (event) => {
			//     this.tap(event)
			//   };
			//   this['eventRun_image_tap'] = (event) => {
			//     console.log(event.detail); // todoList checkbox发生change事件
			//   };



			//   let data = towxml.toJson(
			//     text.slice(15),
			//     'markdown',
			//   );

			//   data = towxml.initData(data, {
			//     base: "https://www.thinkmoon.cn",
			//     app: this
			//   });

			//   this.setData({
			//     article: data
			//   })
			// }
		},
	}
})
