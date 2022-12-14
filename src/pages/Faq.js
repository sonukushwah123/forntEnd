import React, {Component} from "react"


class Faq extends Component{
	constructor(props){
		super(props)
		this.state = {
			User:[],
			isLoading:false,
			isError:false,
			visibility: false
         
		}
		this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
	};


	async componentDidMount(){
		this.setState({isLoading:true})
		const response = await fetch("http://localhost:5000/getFaqs",{
			method: "GET",
						mode: "cors",
						headers: {
							'Content-type': 'application/json',
							'Accept': 'application/json'
		}
	}
		);
		if(response.ok){
			const User = await response.json()
			console.log(User)
			this.setState({...this.state,User: User.data,isLoading:false})
		}else{
			this.setState({isError:true,isLoading:false})
		}
	};

	handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            };
        });
    }


	render(){

		const {User, isLoading, isError} = this.state

		if(isLoading){
			return <div>Loading...</div>
		}
		
		if(isError){
			return <div>Error...</div>
		}
        
	if(User.length < 0){
        return User.length > 0
    }
console.log("this.props.User", this.state.User)
  return (
    <div>
      <section className="faq_sec">
		<h2 className="faq_sec-h2">Frequently Asked Questions</h2>
		<p className="faq_sec-p">Sometimes all you need is a fast answer to a question. We understand. Answers to our most frequently 
		asked questions may be found here.</p>

</section>

<section className="faq_section1">
<div className="container">
<div className="row">
<h2 className="faq_h3">FAQs</h2>
			<div className="faq-inner">

			

		{ this.state.User && this.state.User.map((friend, number) => {
return(
<div className="faq-item bg_set accordion-item"  onClick={this.handleToggleVisibility} key={number.toString()}>
    <h2 className="faq_item-h3 accordion-header" id="flush-headingOne">
      <button className="faq-plus size accordion-button bg-transparent text-white accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
	  {friend.title}
      </button>
    </h2>
	
    <div id="flush-collapseOne" className="bg-white accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">
	  {friend.dec}
      </div>
	  
	
    </div>
  </div>

)
})
}

				
				
				
				
			</div>
</div>
</div>
</section>

    </div>
  )
}
}

export default Faq
