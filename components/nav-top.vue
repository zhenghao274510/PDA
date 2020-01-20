<template>
    <view>
        <!-- #ifdef APP-PLUS -->  
        <view class="status_bar">  
            <view class="top_view"></view>  
        </view>  
        <!-- #endif --> 
        <view>  
            
        </view> 
    </view>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style>
.status_bar {  
    height: var(--status-bar-height);  
    width: 100%;  
    background-color: #FFFFFF;  
}  
.top_view {  
    height: var(--status-bar-height);  
    width: 100%;  
    position: fixed;  
    background-color: #F8F8F8;  
    top: 0;  
    z-index: 999;  
} 
</style>

