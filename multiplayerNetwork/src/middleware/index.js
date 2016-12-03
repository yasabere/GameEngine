import { Router } from 'express';

export default ({ config, db }) => {
	let routes = Router();

	// add middleware here
	console.log("middleware");

	return routes;
}
