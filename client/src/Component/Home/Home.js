import React,{Component} from "react";
import CategoryBar from "./CategoryBar";
import Carousel from "./Carousel";
import SubCat from "./SubCat";
import Nav from "../Nav";

class Home extends Component{
    render(){
        return(
            <><Nav/>
            <CategoryBar/>
            <Carousel/>
            <SubCat/>
            
            </>
        )
    }
}

export default Home;