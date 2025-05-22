import React from 'react'

import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

import { CiUser } from "react-icons/ci";

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'AdminDashboard',
        path: '/admin',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: <HiOutlineCube />
    },
    {
        key: 'orders',
        label: 'Orders',
        path: '/#',
        icon: <HiOutlineShoppingCart />
    },
    {
        key: 'customers',
        label: 'Customers',
        path: '/customers',
        icon: <HiOutlineUsers />
    },
    {
        key: 'transactions',
        label: 'Transactions',
        path: '/transactions',
        icon: <HiOutlineDocumentText />
    },
    {
        key: 'messages',
        label: 'Messages',
        path: '/messages',
        icon: <HiOutlineAnnotation />
    }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '/settings',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'User Page',
        path: '/',
        icon: <CiUser />
    }
]


export const HEADER_LINKS = [
    {
        key:"home",
        label:"Domů",
        path:"/"
    },
    {
        key:"",
        label:"",
        path:"",
    }
]