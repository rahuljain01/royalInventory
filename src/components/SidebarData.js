import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Users',
        path: '/overview/users',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Revenue',
        path: '/overview/revenue',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Add',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Items',
        path: '/addItem',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Customer',
        path: '/addCustomer',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Invoice',
        path: '/createInvoice',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Purchase',
        path: '/createPurchase',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Staff',
        path: '/addStaff',
        icon: <IoIcons.IoIosPaper />
      },{
        title: 'Vendor',
        path: '/addVendor',
        icon: <IoIcons.IoIosPaper />
      },{
        title: 'Store',
        path: '/addStore',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Products',
    path: '/itemView',
    icon: <FaIcons.FaCartPlus />
  },
  {
    title: 'Team',
    path: '/addStaff',
    icon: <IoIcons.IoMdPeople />
  },
  {
    title: 'List',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Customer List',
        path: '/customerList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Invoice List',
        path: '/invoiceList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Purchase List',
        path: '/purchaseList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Vendor List',
        path: '/vendorList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Store List',
        path: '/storeList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Brand List',
        path: '/brandList',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Category List',
        path: '/categoryList',
        icon: <IoIcons.IoIosPaper />
      }

    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];
