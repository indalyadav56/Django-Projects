import { Menu, Settings, Users, Tool, Map, GitBranch, Grid, Activity, Droplet } from 'react-feather'
import { AssetRouteEnum } from '../../constants/assets'

export default [
  {
    id: 'menu',
    title: 'Menu',
    icon: <Menu size={20} />,
    children: [
      {
        id: 'network',
        title: 'Network Overview',
        icon: <Map size={20} />,
        navLink: '/second-page'
      },
      {
        id: 'terminals',
        title: 'Terminal',
        icon: <Droplet size={20} />,
        navLink: '/terminals'
      },
      {
        id: 'hydrocarbon-accounting',
        title: 'Hydrocarbon Accounting',
        icon: <Activity size={20} />,
        navLink: '/hydrocarbon-accounting'
      }
    ]
  },
  {
    id: 'settings',
    title: 'System Settings',
    icon: <Settings size={20} />,
    // navLink: '/settings',
    children: [
      {
        id: 'user-management',
        title: 'User Management',
        icon: <Users size={20} />,
        navLink: '/ums'
      },
      {
        id: 'role-management',
        title: 'Role Management',
        icon: <Users size={20} />,
        navLink: '/role-management'
      },
      {
        id: 'configurations',
        title: 'Configurations',
        icon: <Tool size={20} />,
        children: [
          {
            id: 'pipeline-network',
            title: 'Pipeline Network',
            icon: <GitBranch size={20} />,
            navLink: '/pipeline-network'
          },
          {
            id: 'assets',
            title: 'Assets',
            icon: <Grid size={20} />,
            navLink: AssetRouteEnum.ASSET_GROUPS
          }
        ]
      }
    ]
  }
]
