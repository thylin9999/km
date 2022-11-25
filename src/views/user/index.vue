<!--
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
-->
<template>
    <div class="user-center">
        <div class="user-content">
            <div class="user-info">
                <van-skeleton
                    avatar
                    :row="2"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                    avatar-size="64px"
                >
                    <div class="user-avatar">
                        <v-image
                            v-if="!isLogin"
                            src=""
                            :defaultSrc="avatar"
                            alt=""
                            @click="$router.push('/login')"
                        />
                        <div v-else class="login-avatar">
                            <v-image
                                :src="userInfoState.avatar"
                                alt=""
                                @click="$router.push('/personInfo')"
                            />
                            <div
                                class="vip"
                                v-show="userInfoState.is_vip === 1"
                            >
                                <img
                                    src="@/assets/images/user/icon_mine_name_vip.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div class="user-login-status">
                        <div class="login-before">
                            <span
                                v-if="!isLogin"
                                @click="$router.push('/login')"
                            >
                                登录/注册
                            </span>
                            <span v-else > {{ userInfoState.nick_name }} </span>
                        </div>
                        <div v-if="isLogin" class="login_info">
                            <span>id: {{ userInfoState.id }}</span>
                            <img src="@/assets/images/user/userCenter/man.png" alt="">
                        </div>
                        <div class="login-before-des" v-if="!isLogin">
                            看官大人欢迎您~
                        </div>
                    </div>
                    
                    <div v-if="userInfoState.is_vip === 1 " class="vip_privilege">
                        VIP无限观影
                    </div>
                    <div v-else class="remaing_times">
                        <span class="time_num">100</span>
                        <span class="time_label">剩余观影次数</span>
                    </div>
                </van-skeleton>
            </div>

            <div class="user-buy">
                <van-skeleton
                    :row="1"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                    <div class="user-vip-text">
                        <i class="user-vip-icon"></i>
                        <span v-if="!isLogin">开通vip会员 畅享无限次观影</span>
                        <span v-else>{{
                            userInfoState.is_vip === 1
                                ? `会员至:${userInfoState.expire_time}到期`
                                : '开通vip会员 畅享无限次观影'
                        }}</span>
                    </div>

                    <div class="user-buy-vip" @click="$router.push('/member')">
                        {{
                            userInfoState.is_vip === 1 ? '立即续费' : '立即开通'
                        }}
                    </div>
                </van-skeleton>
            </div>
        </div>
        <div class="user-wallet">
            <div class="user-wallet-info">
                <van-skeleton
                    avatar
                    :row="2"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                    avatar-size="64px"
                >
                    <div class="user-walet-content">
                        <span class="label">钱包</span>
                        <span class="wallet_num">¥0.00</span>
                        <span class="label">点击充值</span>
                    </div>
                </van-skeleton>
            </div>
        </div>
        <div class="user-privilege">
            <div class="user-privilege-info">
                <van-skeleton
                    avatar
                    :row="2"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                    avatar-size="64px"
                >
                    <div class="user-privilege-content">
                       <div class="privilege_item">
                           <img src="../../assets/images/user/userCenter/myShortVideo.png" alt="">
                           <span>我的短视频</span>
                       </div>
                       <div class="privilege_item">
                           <img src="../../assets/images/user/userCenter/myVideo.png" alt="">
                           <span>我的影片</span>
                       </div>
                       <div class="privilege_item">
                           <img src="../../assets/images/user/userCenter/message.png" alt="">
                           <span>消息通知</span>
                       </div>
                       <div class="privilege_item">
                           <img src="../../assets/images/user/userCenter/customer.png" alt="">
                           <span>在线客服</span>
                       </div>
                    </div>
                </van-skeleton>
            </div>
        </div>
        <!-- <div class="user-block">
            <van-cell-group>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                    <van-cell
                        title="会员"
                        :label="
                            !isLogin
                                ? '开通vip会员 畅享无限次观影'
                                : userInfoState.is_vip === 1
                                ? userInfoState.expire_time
                                : '开通vip会员 畅享无限次观影'
                        "
                    >
                        <template #right-icon>
                            <van-button
                                color="#FFB01B"
                                size="small"
                                @click="$router.push('/member')"
                                >购买</van-button
                            >
                        </template>
                        
                    </van-cell>
                </van-skeleton>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userAmountState).length === 0
                    "
                >
                    <van-cell
                        title="钱包"
                        :label="
                            '¥' + (!isLogin ? '0.00' : userAmountState.amount)
                        "
                    >
                        <template #right-icon>
                            <van-button
                                color="#FFB01B"
                                size="small"
                                @click="$router.push('/wallet')"
                                >充值</van-button
                            >
                        </template>
                    </van-cell>
                </van-skeleton>
                <van-cell title="邀请好友" is-link to="/shareApp" />
            </van-cell-group>
        </div> -->
        <div class="user-center-line">
            <div class="single-line">
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                   <div class="line_item">
                       <div class="left-part">
                           <div class="left_icon icon1"></div>
                            <span>个人资料</span>
                       </div>
                       <div class="right_arrow"></div>
                   </div>
                </van-skeleton>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                   <div class="line_item">
                       <div class="left-part">
                           <div class="left_icon icon2"></div>
                            <span>账号凭证</span>
                       </div>
                       <div class="right_arrow"></div>
                   </div>
                </van-skeleton>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                   <div class="line_item">
                       <div class="left-part">
                           <div class="left_icon icon3"></div>
                            <span>找回账号</span>
                       </div>
                       <div class="right_arrow"></div>
                   </div>
                </van-skeleton>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                   <div class="line_item">
                       <div class="left-part">
                           <div class="left_icon icon4"></div>
                            <span>邀请好友</span>
                       </div>
                       <div class="right_arrow"></div>
                   </div>
                </van-skeleton>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                   <div class="line_item">
                       <div class="left-part">
                           <div class="left_icon icon5"></div>
                            <span>我的足迹</span>
                       </div>
                       <div class="right_arrow"></div>
                   </div>
                </van-skeleton>
                <van-skeleton
                    :row="3"
                    :loading="
                        isLogin && Object.keys(userInfoState).length === 0
                    "
                >
                   <div class="line_item">
                       <div class="left-part">
                           <div class="left_icon icon6"></div>
                            <span>系统设定</span>
                       </div>
                       <div class="right_arrow"></div>
                   </div>
                </van-skeleton>
            </div>
        </div>
        <!-- <router-link
            :to="`/iframe?src=${customer.payqq.trim()}`"
            v-if="customer.payqq"
            class="user-cusromer"
        >
        </router-link> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onActivated } from 'vue';
import _ from 'lodash';
import { useStore } from '@/store';
import { userActionTypes } from '@/store/modules/user/action-types';
import avatar from '@/assets/images/user/user_avatar.png';
import { checkRecharge } from '@/configs/checkRecharge';

export default defineComponent({
    beforeRouteEnter(to, from, next) {
        const rechargeDefer = _.debounce(() => {
            checkRecharge();
        }, 1500);
        rechargeDefer();
        next();
    },
    setup() {
        const store = useStore();
        const isLogin = computed(() => store.getters.getterIsLogin);
        const userInfoState = computed(() => store.getters.getterUserInfo);
        const userAmountState = computed(() => store.getters.getterUserAmount);
        const customer = computed(() => store.getters.getterConfig);

        onActivated(() => {
            if (isLogin.value) {
                store.dispatch(userActionTypes.GET_USREINFO);
                store.dispatch(userActionTypes.GET_USREAMOUNT);
            }
        });

        return {
            isLogin,
            userInfoState,
            userAmountState,
            avatar,
            customer,
        };
    },
});
</script>

<style scoped lang="scss">
.user-center {
    // background-color: $color-global-background;
    background-color: #171C39 ;
    .user-content {
        width: 100%;
        @include bgurl('@/assets/images/user/userCenter/top_bg.png');
        height: 420px;
        .van-skeleton {
            width: 100%;
        }
        .user-info {
            width: 100%;
            height: 296px;
            position: relative;
            @include flexStartCenter();
            .user-avatar {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin-left: 25px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                .login-avatar {
                    position: relative;
                    width: 120px;
                    height: 120px;
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
            }
            .user-login-status {
                margin-left: 22px;
                .login-before {
                    min-width: 160px;
                    height: 44px;
                    color: $color-text-white;
                    font-size: $font-size-16;
                    font-weight: 500;
                    line-height: 44px;
                    // border: 1px solid $color-text-white;
                    // @include flexCenter();
                    // border-radius: 20px;
                    // padding: 0 10px;
                    text-align: left;
                }
                .login_info {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    color: #434B65;
                    height: 34px;
                    line-height: 34px;
                    font-size: 24px;
                    img {
                       width: 24px;
                       height: 24px;
                       object-fit: contain; 
                       margin-left: 18px;
                    }
                }
                .login-before-des {
                    color: $color-text-white;
                    font-size: $font-size-24;
                    margin-top: 20px;
                }
            }
            .vip_privilege {
                width: 176px;
                height: 48px;
                color:  #11172A;
                background: #11172A linear-gradient(137deg, #FFF5B8 0%, #FFC318 100%);
                border-radius: 39px 0px 0px 39px;
                position: absolute;
                right: 0;
                text-align: center;
                line-height: 48px;
            }
            .remaing_times {
                position: absolute;
                right: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 176px;
                height: 78px;
                background: rgba(17,23,42,0.5);
                border-radius: 39px 0px 0px 39px;
                padding-top: 4px;
                box-sizing: border-box;
                .time_num {
                    height: 40px;
                    line-height: 40px;
                    color: #FFFFFF;
                    font-size: 28px;
                }
                .time_label {
                    height: 28px;
                    font-size: 20px;
                    font-weight: 400;
                    color: #434B65;
                    line-height: 28px;
                }
            }
        }
        .user-buy {
            width: 660px;
            position: relative;
            margin: 0 auto;
            bottom: -9px;
            @include bgurl('@/assets/images/user/userCenter/vip_bg.png');
            background-size: 100% 100%;
            height: 110px;
            padding-right: 14px;
            box-sizing: border-box;
            @include flexBetweenCenter();
            .user-vip-text {
                @include flexCenter();
                .user-vip-icon {
                    width: 30px;
                    height: 30px;
                    margin: 0 10px 0 30px;
                    @include bgurl('@/assets/images/user/userCenter/vip_icon.png');
                }
                span {
                    font-size: $font-size-24;
                    color: #FFE688;
                }
            }
            .user-buy-vip {
                @include flexCenter();
                width: 130px;
                height: 40px;
                background: linear-gradient(137deg, #FFF5B8 0%, #FFC318 100%);
                margin-right: 14px;
                border-radius: 30px;
                font-size: $font-size-20;
                color: #11172A;
            }
        }
    }
    .user-wallet {
        width: 100%;
        padding: 34px 0px 32px 0px; 
        background: #11172a;
        margin-bottom: 10px;
        .user-wallet-info {
            width: 626.6px;
            height: 121.77px;
            margin: 0 auto;
            @include bgurl('@/assets/images/user/userCenter/wallet_bg.png');
            .user-walet-content {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: #FFFFFF;
                .label {
                    height: 28px;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 28px;
                }
                .wallet_num {
                    height: 44px;
                    line-height: 44px;
                    font-weight: 400;
                    font-size: 32px;
                }
            }
        }
    }
    .user-privilege {
        width: 100%;
        padding: 20px 0px 22px 0px; 
        background: #11172a;
        margin-bottom: 10px;
        .user-privilege-info {
            width: 626.6px;
            height: 121.77px;
            margin: 0 auto;
            // @include bgurl('@/assets/images/user/userCenter/wallet_bg.png');
            .user-privilege-content {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                color: #FFFFFF;
                .privilege_item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 108px;
                        height: 100px;
                        object-fit: contain;
                    }
                    span {
                        font-size: 24px;
                        color: #FFFFFF;
                        height: 34px;
                        line-height: 34px;
                    }
                }
            }
        }
    }
    .user-block {
        margin-top: 20px;
    }
    .user-center-line {
        width: 100%;
       .single-line {
           display: flex;
           flex-direction: column;
           .line_item {
               display: flex;
               flex-direction: row;
               align-items: center;
               justify-content: space-between;
               padding-bottom: 26px;
               margin-left: 26px;
               margin-right: 22px;
               padding-top: 28px;
               border-bottom: 1px solid #48506B;
               .left-part {
                   display: flex;
                   flex-direction: row;
                   align-items: center;
                   justify-content: flex-start;
                   .left_icon {
                       width: 52px;
                       height: 52px;
                       margin-right: 8px;
                   }
                   .icon1 {
                       @include bgurl('@/assets/images/user/userCenter/user_01.png');
                   }
                   .icon2 {
                       @include bgurl('@/assets/images/user/userCenter/user_02.png');
                   }
                   .icon3 {
                       @include bgurl('@/assets/images/user/userCenter/user_03.png');
                   }
                   .icon4 {
                       @include bgurl('@/assets/images/user/userCenter/user_04.png');
                   }
                   .icon5 {
                       @include bgurl('@/assets/images/user/userCenter/address.png');
                   }
                   .icon6 {
                       @include bgurl('@/assets/images/user/userCenter/settings.png');
                   }
                   span {
                       height: 40px;
                       line-height: 40px;
                       font-weight: 500;
                       font-size: 28px;
                       color: #FFFFFF;
                   }
               }
               .right_arrow {
                   width: 24px;
                   height: 24px;
                   @include bgurl('@/assets/images/user/userCenter/arrow_right.png');
                   margin-right: 20px;
               }
           }
       } 
    }
    .user-cusromer {
        width: 100px;
        height: 100px;
        position: fixed;
        right: 30px;
        bottom: 300px;
        @include bgurl('@/assets/images/user/icon_customer.png');
        display: block;
    }
}
</style>
