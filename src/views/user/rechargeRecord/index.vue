<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="recharge-record">
        <v-header left-arrow title="交易记录" />
        <van-tabs
            v-model:active="active"
            sticky
            @click-tab="recordTab"
            color="#f99c10"
        >
            <van-tab title="充值记录" :name="1">
                <recharge-list :recordType="active" v-if="active === 1" />
            </van-tab>
            <van-tab title="消费记录" :name="3">
                <recharge-list :recordType="active" v-if="active === 3" />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import rechargeList from './recordRechargeList.vue';

export default defineComponent({
    components: {
        rechargeList,
    },
    setup() {
        const active = ref(1);

        const recordTab = (val: any) => {
            active.value = val.name;
        };

        return { active, recordTab };
    },
});
</script>

<style scoped lang="scss">
:deep(.van-nav-bar) {
    background-color: #171C39;
}
:deep(.van-icon-arrow-left:before) {
    color: #FFFFFF;
    font-size: 39px;
}
:deep(.van-nav-bar__title) {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 32px;
}
:deep(.van-cell) {
    background-color: #11172a;
}
:deep(.van-hairline--bottom:after) {
    border: none;
}
:deep(.van-cell__title) {
    color: #FFFFFF;
    margin-left: 20px;
}
:deep(.van-cell__value) {
    color: #FFFFFF;
}
:deep(.van-cell:after) {
    background-color: #48506B;
    height: 1px;
}
:deep(.van-tab__text) {
    color: #fff;
}
:deep(.van-tabs__nav--line) {
    background-color:#11172a;
}
.recharge-record {
    background-color: #11172a;
}
</style>
