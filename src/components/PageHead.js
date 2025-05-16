import { ConvertCase } from "../hooks/ConvertCase";

function PageHead ({id='create', title}) {
	return (
		<>
			{/* <!-- head --> */}
			<div id={id} className="section layout_padding padding_bottom-0">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="full">
								<div className="heading_main text_align_center">
									<h2>
										<span>{ConvertCase(title)}</span>
									</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- end head --> */}
		</>
	)
}
export { PageHead };
