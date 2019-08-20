import BasicLayout from './BasicLayout'
import UserLayout from './UserLayout'

function PageLayout(props) {
  console.log("TCL: BasicLayout -> props", props)
  const { children } = props
  return props.location.pathname === '/login' ? (
    <UserLayout>
      {children}
    </UserLayout>
  ) : (
    <BasicLayout>
      {children}
    </BasicLayout>
  )
}

export default PageLayout;
