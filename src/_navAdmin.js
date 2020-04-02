export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Menu',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Daftar Alat Ukur',
      url: '/devices',
      icon: 'fa fa-cogs',
      children: [
        {
          name: 'All Lab',
          url: '/devices/tot',
          icon: 'icon-globe',
        },
        {
          name: 'Lab Kalibrasi',
          url: '/devices/cal',
          icon: 'icon-wrench',
        },
        {
          name: 'Lab Transmisi',
          url: '/devices/tra',
          icon: 'icon-feed',
        },
        {
          name: 'Lab Kabel',
          url: '/devices/cab',
          icon: 'icon-diamond',
        },
        {
          name: 'Lab Device',
          url: '/devices/dev',
          icon: 'icon-screen-desktop',
        },
        {
          name: 'Lab Energi',
          url: '/devices/ene',
          icon: 'icon-energy',
        }
      ]
    },
    {
      name: 'SPK',
      url: '/requests',
      icon: 'icon-envelope-letter'
    },
    {
      name: 'Schedules',
      url: '/schedules',
      icon: 'icon-calendar',
      children: [
        {
          name: 'All Lab',
          url: '/schedules',
          icon: 'icon-globe',
        },
        {
          name: 'Lab Kalibrasi',
          url: '/schedules/cal',
          icon: 'icon-wrench',
        },
        {
          name: 'Lab Transmisi',
          url: '/schedules/tra',
          icon: 'icon-feed',
        },
        {
          name: 'Lab Kabel',
          url: '/schedules/cab',
          icon: 'icon-diamond',
        },
        {
          name: 'Lab Device',
          url: '/schedules/cpe',
          icon: 'icon-screen-desktop',
        },
        {
          name: 'Lab Energi',
          url: '/schedules/ene',
          icon: 'icon-energy',
        }
      ]
    },
    {
      name: 'Dokumen Mutu',
      url: '/procedures',
      icon: 'icon-notebook',
      children: [
        {
          name: 'Panduan Mutu',
          url: '/procedures/pm',
          icon: 'icon-map',
        },
        {
          name: 'Prosedur',
          url: '/procedures/general',
          icon: 'icon-cursor-move',
        }
      ]
    },
    {
      name: 'Instruksi Kerja',
      url: '/wi',
      icon: 'icon-cursor',
      children: [
        {
          name: 'All Lab',
          url: '/wi',
          icon: 'icon-globe',
        },
        {
          name: 'Lab Kalibrasi',
          url: '/wi/kal',
          icon: 'icon-wrench',
        },
        {
          name: 'Lab Transmisi',
          url: '/wi/tra',
          icon: 'icon-feed',
        },
        {
          name: 'Lab Kabel',
          url: '/wi/kab',
          icon: 'icon-diamond',
        },
        {
          name: 'Lab Device',
          url: '/wi/dev',
          icon: 'icon-screen-desktop',
        },
        {
          name: 'Lab Energi',
          url: '/wi/ene',
          icon: 'icon-energy',
        }
      ]
    },
    {
      name: 'Test Report',
      url: '/requests',
      icon: 'icon-calendar',
      children: [
        {
          name: 'Calibration',
          url: '/requests/1/cal/certificate',
          icon: 'icon-globe',
        },
        {
          name: 'Quality Assurance',
          url: '/requests/1/qa/certificate',
          icon: 'icon-wrench',
        },
        {
          name: 'Test Approval',
          url: '/requests/1/ta/certificate',
          icon: 'icon-feed',
        },
        {
          name: 'Voluntary Test',
          url: '/requests/1/vt/certificate',
          icon: 'icon-diamond',
        }
      ]
    },
    {
      name: 'Registrasi',
      url: '/register',
      icon: 'icon-user-follow'
    },
    // {
    //   name: 'Sertifikat',
    //   url: '/certificates',
    //   icon: 'icon-badge',
    // },
    // {
    //   name: 'Manual',
    //   url: '/manuals',
    //   icon: 'icon-directions',
    //   children: [
    //     {
    //       name: 'Lab Kalibrasi',
    //       url: '/manuals/cal',
    //       icon: 'icon-wrench',
    //     },
    //     {
    //       name: 'Lab Transmisi',
    //       url: '/manuals/tra',
    //       icon: 'icon-feed',
    //     },
    //     {
    //       name: 'Lab Kabel',
    //       url: '/manuals/cab',
    //       icon: 'icon-diamond',
    //     },
    //     {
    //       name: 'Lab Device',
    //       url: '/manuals/dev',
    //       icon: 'icon-screen-desktop',
    //     },
    //     {
    //       name: 'Lab Energi',
    //       url: '/manuals/ene',
    //       icon: 'icon-energy',
    //     },
    //     {
    //       name: 'Eksternal',
    //       url: '/manuals/ext',
    //       icon: 'icon-globe',
    //     }
    //   ]
    // },
    // {
    //   name: 'Item Test',
    //   url: '/test_items',
    //   icon: 'icon-list',
    //   children: [
    //     {
    //       name: 'Lab Kalibrasi',
    //       url: '/test_items/cal',
    //       icon: 'icon-wrench',
    //     },
    //     {
    //       name: 'Lab Transmisi',
    //       url: '/test_items/tra',
    //       icon: 'icon-feed',
    //     },
    //     {
    //       name: 'Lab Kabel',
    //       url: '/test_items/cab',
    //       icon: 'icon-diamond',
    //     },
    //     {
    //       name: 'Lab Device',
    //       url: '/test_items/dev',
    //       icon: 'icon-screen-desktop',
    //     },
    //     {
    //       name: 'Lab Energi',
    //       url: '/test_items/ene',
    //       icon: 'icon-energy',
    //     },
    //     {
    //       name: 'Eksternal',
    //       url: '/test_items/ext',
    //       icon: 'icon-globe',
    //     }
    //   ]
    // },
    // {
    //   name: 'Forms',
    //   url: '/forms',
    //   icon: 'icon-doc',
    //   children: [
    //     {
    //       name: 'Lab Kalibrasi',
    //       url: '/forms/cal',
    //       icon: 'icon-wrench',
    //     },
    //     {
    //       name: 'Lab Transmisi',
    //       url: '/forms/tra',
    //       icon: 'icon-feed',
    //     },
    //     {
    //       name: 'Lab Kabel',
    //       url: '/forms/cab',
    //       icon: 'icon-diamond',
    //     },
    //     {
    //       name: 'Lab Device',
    //       url: '/forms/dev',
    //       icon: 'icon-screen-desktop',
    //     },
    //     {
    //       name: 'Lab Energi',
    //       url: '/forms/ene',
    //       icon: 'icon-energy',
    //     },
    //     {
    //       name: 'Eksternal',
    //       url: '/forms/ext',
    //       icon: 'icon-globe',
    //     }
    //   ]
    // },
    // {
    //   name: 'Forms',
    //   url: '/admin/user',
    //   icon: 'icon-doc',
    // }
  ]
};
