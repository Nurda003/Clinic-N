import React from 'react'
import { generatePath, useParams } from 'react-router-dom'
import NotFound from './comps/NotFound'

function Pagerender() {

    const generatePage = (page) => {
        const component = () => require(`./pages/${page}`).default

        try {
            return React.createElement(component())
        } catch (err) {
            return <NotFound />
        }
    }

    console.log(useParams())

    const {page,id} = useParams()

    let pageNum = ''

    if (id){
        pageNum = `${page}/${id}`
    }
    else{
        pageNum = `${page}`
    }

  return generatePage(pageNum)
}

export default Pagerender