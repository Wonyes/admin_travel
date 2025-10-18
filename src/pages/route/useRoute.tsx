import React from "react";

import AdminInquiry from "@/components/admin/inquiry/AdminInquiry";
import AdminModify from "@/components/admin/inquiry/AdminModify";
import AdminRegis from "@/components/admin/regis/AdminRegis";
import Counsel from "@/components/counsel/Counsel";
import Qa from "@/components/counsel/Qa";
import Mypage from "@/components/mypage/Mypage";
import OrderInquiry from "@/components/order/inquiry/OrderInquiry";
import IssueCancell from "@/components/order/manage/IssueCancell";
import RequestManage from "@/components/order/refund/RequestManage";
import ProductDetail from "@/components/product/inquiry/ProductDetail";
import ProductInquiry from "@/components/product/inquiry/ProductInquiry";
import ProductModify from "@/components/product/regis/ProductModify";
import ProductRegis from "@/components/product/regis/ProductRegis";
import TicketProcess from "@/components/ticket/TicketProcess";
import Report from "@/components/counsel/Report";

export interface RouteInfo {
  path: string;
  component: React.ComponentType;
}

const routes: RouteInfo[] = [
  { path: "/p.regis", component: ProductRegis },
  { path: "/p.inquiry", component: ProductInquiry },
  { path: "/p.detail/:no", component: ProductDetail },
  { path: "/p.modify/:no", component: ProductModify },

  { path: "/o.inquiry", component: OrderInquiry },
  { path: "/o.manage", component: IssueCancell },
  { path: "/o.refund", component: RequestManage },

  { path: "/a.regis", component: AdminRegis },
  { path: "/a.modify/:id/:no", component: AdminModify },
  { path: "/a.inquiry", component: AdminInquiry },

  { path: "/mypage", component: Mypage },

  { path: "/m.counsel", component: Counsel },
  { path: "/m.qa", component: Qa },
  { path: "/m.report", component: Report },

  { path: "/", component: TicketProcess },
];

export function useRoute() {
  return { routes };
}
