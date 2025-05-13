import img10 from "../statics/images/img10.png"


export default function ContactUs() {
	return (
		<>
			{/* <!-- head --> */}
			<div className="section layout_padding padding_bottom-0">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="full">
								<div className="heading_main text_align_center">
									<h2><span>Contact</span></h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- end head --> */}
			{/* <!-- body --> */}
			<div className="section contact_section"
			style={{background: "#12385b"}}
			>
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-6 col-sm-12">
							<div className="full float-right_img">
								<img src={img10} alt="#"/>
							</div>
						</div>
						<div className="layout_padding col-lg-6 col-md-6 col-sm-12">
							<div className="c_form">
								<form action="contact.html">
									<fieldset>
										<div className="full field">
											<input type="text" placeholder="Your Name" name="your name" />
										</div>
										<div className="full field">
											<input type="email" placeholder="Email Address" name="Email" />
										</div>
										<div className="full field">
											<input type="phn" placeholder="Phone Number" name="Phone number" />
										</div>
										<div className="full field">
											<textarea placeholder="Massage"></textarea>
										</div>
										<div className="full field">
											<div className="center"><button>Send</button></div>
										</div>
									</fieldset>
								</form>
							</div>
						</div>
					</div>			  
				</div>
			</div>
			{/* <!-- end body --> */}
		</>
	)
}