const navData = [
  /**
   * Overview
   */
  {
    // subheader: 'Overview',
    items: [
      { title: 'Dashboard', path: 'paths.dashboard.root', icon: 'ICONS.dashboard ' },
      { title: 'Orders', path: 'paths.dashboard.order.root', icon: 'ICONS.order ' },
      {
        title: 'Products',
        path: 'paths.dashboard.product.root',
        icon: 'ICONS.file',
        children: [
          { title: 'Products List', path: ' paths.dashboard.product.root' },
          { title: 'Products Addons', path: ' paths.dashboard.product.addons ' },
          { title: 'Product Stock', path: ' paths.dashboard.product.stock' },
        ],
      },
      { title: 'Orders Status', path: 'paths.dashboard.order.status', icon: ' ICONS.menuItem' },
      { title: 'Plans', path: 'paths.dashboard.plan.root', icon: 'ICONS.booking' },
      { title: 'Plans Status', path: ' paths.dashboard.plan.status', icon: 'ICONS.menuItem' },
      { title: 'Customers', path: 'paths.dashboard.customers.root', icon: 'ICONS.course' },
      { title: 'Payments', path: 'paths.dashboard.payments.root', icon: ' ICONS.invoice' },
      { title: 'Reminders', path: 'paths.dashboard.reminders.root', icon: 'ICONS.calendar' },
      { title: 'Tickets', path: 'paths.dashboard.tickets.root', icon: 'ICONS.external' },
      { title: 'Staff', path: 'paths.dashboard.staff.root', icon: 'ICONS.label ' },
      {
        title: 'Reports',
        path: 'paths.dashboard.reports.root',
        icon: 'ICONS.reports',
        children: [
          { title: 'Daily Report', path: 'paths.dashboard.reports.daily' },
          { title: 'Order Report', path: 'paths.dashboard.reports.order' },
          { title: 'Plan Report', path: ' paths.dashboard.reports.plan' },
          { title: 'Stock Report', path: 'paths.dashboard.reports.stock' },
        ],
      },
      {
        title: 'Tools',
        path: 'paths.dashboard.tools.root',
        icon: 'ICONS.course',
        children: [
          { title: 'Account Settings', path: 'paths.dashboard.tools.root' },
          { title: 'Financial Year', path: 'paths.dashboard.tools.financial' },
          { title: 'Master Setting', path: 'paths.dashboard.tools.master' },
        ],
      },
      { title: 'Logout', path: 'paths.dashboard.general.course', icon: 'ICONS.course' },
    ],
  },
];

const updateNavData = (navData, permissions) => {
  const hasPermission = (requiredPermission) => permissions.includes(requiredPermission);

  return navData.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      // Remove items based on permissions
      if (item.title === 'Orders' && !hasPermission('view_orders')) return false;
      if (item.title === 'Products' && !hasPermission('view_orders')) return false;
      if (item.title === 'Orders Status' && !hasPermission('view_orders')) return false;
      if (item.title === 'Plans' && !hasPermission('view_plans')) return false;
      if (item.title === 'Plans Status' && !hasPermission('view_orders')) return false;
      if (item.title === 'Payments' && !hasPermission('view_orders')) return false;
      if (item.title === 'Reminders' && !hasPermission('view_orders')) return false;
      if (item.title === 'Tickets' && !hasPermission('view_orders')) return false;
      if (item.title === 'Staff' && !hasPermission('manage_staff')) return false;
      if (item.title === 'Reports' && !hasPermission('view_reports')) return false;
      if (item.title === 'Tools' && !hasPermission('view_reports')) return false;

      // Handle children items within a parent (e.g., Products, Reports)
      if (item.children) {
        item.children = item.children.filter((childItem) => {
          if (childItem.title === 'Products List' && !hasPermission('view_product_stock'))
            return false;
          if (childItem.title === 'Products Addons' && !hasPermission('view_plan_report'))
            return false;
          if (childItem.title === 'Product Stock' && !hasPermission('view_product_stock'))
            return false;
          if (childItem.title === 'Daily Report' && !hasPermission('view_product_stock'))
            return false;
          if (childItem.title === 'Order Report' && !hasPermission('view_product_stock'))
            return false;
          if (childItem.title === 'Plan Report' && !hasPermission('view_product_stock'))
            return false;
          if (childItem.title === 'Stock Report' && !hasPermission('view_product_stock'))
            return false;
          if (childItem.title === 'Account Settings' && !hasPermission('view_product_stock'))
            return false;
          if (childItem.title === 'Financial Year' && !hasPermission('view_product_stock'))
            return false;
          if (childItem.title === 'Master Setting' && !hasPermission('view_product_stock'))
            return false;
          return true;
        });
      }

      return true; // Keep the item if no conditions remove it
    }),
  }));
};

// Example usage:
const userPermissions = ['view_orders', 'view_plans', 'view_product_stock'];
const updatedNavData = updateNavData(navData, userPermissions);

console.log(updatedNavData);
