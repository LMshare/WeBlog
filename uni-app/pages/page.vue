<template>
	<view>
		<cu-custom bgColor="bg-gradual" :isBack="true"><block slot="content">{{ navigation[PageCur] }}</block></cu-custom>
		<home v-if="PageCur=='home'"></home>
		<about v-if="PageCur=='about'"></about>
		<view class="cu-bar tabbar bg-gray shadow foot">
			<view class="action" @click="NavChange('home')">
				<view>
					<view class="icon-home" :class="PageCur=='home'?'color-base':'text-gray'"></view>
				</view>
				<view :class="PageCur=='home'?'color-base':'text-gray'">首页</view>
			</view>
			<view class="action" @click="NavChange('about')">
				<view>
					<view class="icon-info" :class="PageCur=='about'?'color-base':'text-gray'"></view>
				</view>
				<view :class="PageCur=='about'?'color-base':'text-gray'">关于</view>
			</view>
		</view>
	</view style="width:750rpx">
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home',
				navigation: {
					"home":"主页",
					"about":"关于"
				}
			}
		},
		methods: {
			NavChange: function(name) {
				this.PageCur = name
			}
		}
	}
</script>

<style>
::-webkit-scrollbar{
width: 0;
height: 0;
color: transparent;
}
</style>
