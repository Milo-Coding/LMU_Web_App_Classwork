import './Category.css'

const Category = props => {
    const {category} = props
    return <span className='category'>{category}</span>
}

export default Category