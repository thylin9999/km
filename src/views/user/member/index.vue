<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="member">
        <div class="member-header">
            <v-header left-arrow title="会员" fixed />
            <div class="member-info">
                <van-skeleton
                    avatar
                    :row="3"
                    :loading="Object.keys(userInfo).length === 0"
                    avatar-size="64px"
                >
                    <div class="member-avatar">
                        <v-image :src="userInfo.avatar"></v-image>
                        <div class="vip" v-show="userInfo.is_vip === 1">
                            <img
                                src="@/assets/images/user/icon_mine_name_vip.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="member-buy-status">
                        <div class="nick-name">
                            {{ userInfo.nick_name
                            }}<span class="sex_type"></span>
                        </div>
                        <div class="buy-status">
                            <span class="buy-status-des">{{
                                userInfo.is_vip === 1
                                    ? `会员至:${userInfo.expire_time}到期`
                                    : '当前暂未开通会员'
                            }}</span>
                        </div>
                    </div>
                    <div class="buy_vip_now">
                        {{ userInfo.is_vip === 1 ? '立即续费' : '立即开通' }}
                    </div>
                </van-skeleton>
            </div>
        </div>
        <div class="member-content">
            <div class="member-combo-title">选择VIP会员套餐</div>
            <van-skeleton :row="4" :loading="!comboList.vip?.length">
                <div class="choose-content">
                    <div
                        :class="[
                            'choose-content-item-cover',
                            { active: currentIndex === index },
                        ]"
                        v-for="(item, index) in comboList.vip"
                        :key="item.cheap"
                        @click="changeCurrent(index, item)"
                    >
                        <div class="choose-content-item">
                            <div class="choose-content-item-top">
                                {{ item.vip_text }}
                            </div>
                            <div class="choose-content-item-bottom">
                                <div class="price">
                                    <span class="rmb">¥</span>
                                    <span class="amount">{{ item.price }}</span>
                                </div>
                                <div class="discount" v-if="item.cheap > 0">
                                    已优惠¥{{ item.cheap }}
                                </div>
                                <div class="no-discount" v-else></div>
                                <div class="price-per">
                                    ¥{{ item.month_price }}/月
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
            <div class="member-combo-title">VIP权益</div>
            <van-skeleton :row="7" :loading="!equityList?.length">
                <div class="combo-equity">
                    <div
                        class="combo-equity-cover"
                        v-for="item in equityList"
                        :key="item.id"
                    >
                        <div class="combo-equity-item">
                            <div class="combo-equity-item-left">
                                <v-image :src="item.cover"></v-image>
                            </div>
                            <div class="combo-equity-item-right">
                                <div class="equity-title">{{ item.title }}</div>
                                <div class="equity-des">{{ item.sub_title }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-skeleton>
        </div>

        <div class="member-bottom">
            <div class="member-bottom-cover">
                <div class="bottom-btn">
                    <div class="bottom-btn-left">
                        <div class="price">
                            <span>{{ info?.vip_text }}¥ </span
                            ><span> {{ info?.price }}</span>
                        </div>
                    </div>
                    <div class="bottom-btn-right">
                        <div class="buy-btn" @click="userBuyVIP()">
                            {{
                                userInfo.is_vip === 1 ? '立即续费' : '立即开通'
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    computed,
    onMounted,
    ref,
    reactive,
    toRefs,
    watch,
} from 'vue';
import { useStore } from '@/store';
import { userActionTypes } from '@/store/modules/user/action-types';
import { ComboVipType } from '@/types/api/user';
import { getVipBuy } from '@/api/user';
import { Toast, Dialog } from 'vant';
import { useRouter } from 'vue-router';
Toast.allowMultiple();

export default defineComponent({
    setup() {
        const store = useStore();
        const userInfo = computed(() => store.getters.getterUserInfo);
        const router = useRouter();
        const currentIndex = ref(0);
        const buyType = ref(1); //购买套餐类型
        const currentInfo = reactive({
            info: {} as ComboVipType,
        });
        const changeCurrent = (index: number, item: ComboVipType) => {
            currentIndex.value = index;
            currentInfo.info = item;
            buyType.value = item.type;
        };

        const getUserInfo = () => {
            store.dispatch(userActionTypes.GET_USREINFO);
        };
        const getUserCombo = () => {
            store.dispatch(userActionTypes.GET_COMBO);
        };
        const equityList = computed(() => store.state.user.user.combo.info);
        const comboList = computed(() => store.getters.getterCombo);

        //购买VIP
        const userBuyVIP = () => {
            Dialog.confirm({
                title: '确认支付',
                message: `确认支付${currentInfo.info?.price}酷币？`,
                confirmButtonColor: '#f99c10',
            })
                .then(async () => {
                    const toast = Toast.loading({
                        message: '加载中...',
                        forbidClick: false,
                        duration: 0,
                    });
                    const result: any = await getVipBuy({
                        type: buyType.value,
                    });
                    toast.clear();
                    if (result.code !== 0) {
                        Dialog.alert({
                            title: '酷币余额不足',
                            theme: 'round-button',
                            confirmButtonText: '立即充值',
                            confirmButtonColor: '#f99c10',
                            width: '60%',
                            closeOnClickOverlay: true,
                        }).then(() => {
                            router.push('/recharge');
                        });
                    } else {
                        Dialog.alert({
                            title: 'VIP开通成功',
                            theme: 'round-button',
                            confirmButtonText: '我知道了',
                            confirmButtonColor: '#f99c10',
                            width: '60%',
                        }).then(() => {
                            getUserInfo();
                            getUserCombo();
                        });
                    }
                })
                .catch(() => {
                    // on cancel
                });
        };

        onMounted(() => {
            getUserInfo();
            getUserCombo();
        });

        watch(
            () => comboList.value,
            (list) => {
                if (list.vip.length > 0) {
                    changeCurrent(0, list.vip[0]);
                }
            },
        );
        return {
            userInfo,
            comboList,
            changeCurrent,
            currentIndex,
            equityList,
            ...toRefs(currentInfo),
            userBuyVIP,
        };
    },
});
</script>

<style scoped lang="scss">
:deep(.van-nav-bar) {
    background-color: #171c39;
}
:deep(.van-icon-arrow-left:before) {
    color: #ffffff;
    font-size: 39px;
}
:deep(.van-nav-bar__title) {
    color: #ffffff;
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
    color: #ffffff;
    margin-left: 20px;
}
:deep(.van-cell__value) {
    color: #ffffff;
}
:deep(.van-cell:after) {
    background-color: #48506b;
    height: 1px;
}
.member {
    background-color: #171c39;
    .member-header {
        width: 100%;
        height: 300px;
        padding-top: 60px;
        // @include bgurl('@/assets/images/user/mine_bg_vip.png');
        // background-position-y: -130px;
        // background: #11172A;
        // box-shadow: 0px -8px 26px 0px rgba(42,51,110,0.49);

        .member-info {
            margin: 90px auto 0;
            width: 702px;
            height: 188px;
            @include bgurl('@/assets/images/user/userCenter/vip/top_bg.png');
            // background-size: 100% 100%;
            @include flexBetweenCenter();
            position: relative;
            .van-skeleton {
                width: 100%;
            }
            .member-avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin-left: 25px;
                position: relative;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .vip {
                    position: absolute;
                    bottom: -10px;
                    width: 70px;
                    left: 50%;
                    transform: translateX(-50%);
                    img {
                        border-radius: 0;
                    }
                }
            }
            .member-buy-status {
                flex: 1;
                @include flexColumnBetweenStart();
                margin-left: 15px;
                .nick-name {
                    color: $color-text-price;
                    font-size: $font-size-32;
                    font-weight: 500;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    height: 44px;
                    line-height: 44px;
                    .sex_type {
                        width: 24px;
                        height: 24px;
                        @include bgurl(
                            '@/assets/images/user/userCenter/vip/man.png'
                        );
                        margin-left: 16px;
                    }
                }
                .buy-status {
                    margin-top: 26px;
                    @include flexBetweenCenter();
                    width: 100%;
                    .buy-status-des {
                        height: 34px;
                        line-height: 34px;
                        color: $color-text-price;
                        font-size: $font-size-24;
                    }
                }
            }
            .buy_vip_now {
                position: absolute;
                width: 130px;
                height: 40px;
                line-height: 40px;
                background: linear-gradient(137deg, #fff5b8 0%, #ffc318 100%);
                border-radius: 30px;
                font-size: 20px;
                right: 32px;
                bottom: 40px;
                text-align: center;
            }
        }
    }
    .member-content {
        margin-top: 30px;
        padding: 0 30px 120px;
        .member-combo-title {
            font-size: $font-size-28;
            font-weight: 500;
            color: $color-text-51;
        }
        .choose-content {
            width: 100%;
            margin: 30px 0 50px 0;
            @include flexStartCenterWrap();
            .choose-content-item-cover {
                width: 33.33%;
                margin-bottom: 20px;
                &.active {
                    border-color: $color-background-gloden;
                    .choose-content-item-top {
                        border-color: #ffc827;
                        color: #ffcc35;
                    }
                    .choose-content-item {
                        border-color: $color-background-gloden;
                        background: #171c39
                            linear-gradient(137deg, #fff5b8 0%, #ffc318 100%);
                        &-bottom {
                            .price {
                                height: 72px;
                                line-height: 72px;
                                color: $color-text-black;
                                .rmb {
                                    font-size: $font-size-24;
                                }
                                .amount {
                                    font-size: $font-size-48;
                                    // font-weight: bold;
                                }
                                flex: 1;
                                @include flexCenter();
                                align-items: flex-end;
                            }
                        }
                    }
                }
                .choose-content-item {
                    width: 210px;
                    height: 298px;
                    // border: 4px solid rgb(184, 184, 184);
                    border-radius: 10px;
                    background-color: #48506b;
                    @include flexColumnStart();
                    margin: 0 auto;
                    // box-shadow: 5px 5px 10px $color-highlight-background;
                    &:last-child {
                        margin-right: auto;
                    }
                    &-top {
                        width: 100%;
                        @include flexCenter();
                        height: 40px;
                        border-bottom: 1px solid #11172a;
                        font-size: $font-size-24;
                        color: white;
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                    }
                    &-bottom {
                        width: 100%;
                        // flex: 1;
                        margin-top: 46px;
                        @include flexColumnCenter();
                        .price {
                            height: 72px;
                            line-height: 72px;
                            color: white;
                            .rmb {
                                font-size: $font-size-24;
                            }
                            .amount {
                                font-size: $font-size-48;
                                // font-weight: bold;
                            }
                            flex: 1;
                            @include flexCenter();
                            align-items: flex-end;
                        }
                        .discount {
                            background-color: #171c39;
                            font-size: $font-size-16;
                            margin: 0 auto;
                            margin-bottom: 22px;
                            padding: 4px 8px;
                            border-radius: 15px;
                            color: #ffe688;
                            height: 30px;
                            line-height: 30px;
                        }
                        .no-discount {
                            width: 100%;
                            height: 28px;
                            margin: 10px 0;
                            padding: 4px 8px;
                        }
                        .price-per {
                            font-size: $font-size-24;
                            color: #ffffff;
                            margin-bottom: 15px;
                        }
                    }
                }
            }
        }
        .combo-equity {
            width: 100%;
            margin: 30px 0 20px;
            @include flexBetweenCenterWrap();
            &-cover {
                width: 340px;
                height: 160px;
                @include bgurl('@/assets/images/user/userCenter/vip/privilege_bg.png');
                margin-bottom: 14px;
                background-size: 100% 100%;
                .combo-equity-item {
                    height: 100%;
                    border-radius: 10px;
                    padding: 0 44px 0 26px;
                    box-sizing: border-box;
                    // padding: 20px;
                    @include flexAroundCenter();
                    
                    &-left {
                        width: 132px;
                        height: 94px;
                        border-radius: 10px;
                        margin-bottom: 30px;
                        img {
                            width: 100%;
                            height: 100%;
                            border-radius: 10px;
                            object-fit: cover;
                        }
                    }
                    &-right {
                        width: 128px;
                        margin-left: 15px;
                        .equity-title {
                            color: #FFFFFF;
                            font-size: $font-size-28;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            height: 40px;
                            line-height: 40px;
                        }
                        .equity-des {
                            // height: 44px;
                            line-height: 30px;
                            font-size: 16px;
                            color: #11172A;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            /*! autoprefixer: off */
                            -webkit-box-orient: vertical;
                        }
                    }
                }
            }
        }
    }
    .member-bottom {
        width: 100%;
        height: 120px;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #11172A;
        z-index: 9;
        &-cover {
            width: 100%;
            height: 100%;
            @include flexColumnCenter();
            background-color: #11172A;
        }
        .bottom-btn {
            width: 80%;
            height: 80px;
            background-color: #48506B;
            @include flexBetweenCenter();
            border-radius: 40px;
            &-left {
                width: 70%;
                height: 100%;
                line-height: 80px;
                background-color: #48506B;
                padding-left: 30px;
                border-top-left-radius: 40px;
                border-bottom-left-radius: 40px;
                .price {
                    color: $color-text-price;
                    height: 100%;
                    span:nth-child(2) {
                        font-size: $font-size-48;
                    }
                }
            }
            &-right {
                width: 236px;
                height: 100%;
                line-height: 80px;
                text-align: center;
                border-top-right-radius: 40px;
                border-bottom-right-radius: 40px;
                @include bgurl('@/assets/images/user/userCenter/vip/btn_bg.png');
                background-size: 100% 100%;
                .buy-btn {
                    width: 100%;
                    font-size: $font-size-28;
                    color: $color-text-orange;
                }
            }
        }
    }
}
</style>
