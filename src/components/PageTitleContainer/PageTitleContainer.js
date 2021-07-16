import './PageTitleContainer.css'

const PageTitleContainer = (props) => {
 return <div><h1 className='container-title' style={{marginTop: '7rem'}}>{props.title}</h1>{props.children}</div>
}

export default PageTitleContainer;