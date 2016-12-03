import resource from 'resource-router-middleware';
import lobbies from '../models/lobbies';

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'lobby',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let lobby = lobbies.find( lobby => lobby.id===id ),
			err = lobby ? null : 'Not found';
		callback(err, lobby);
	},

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(lobbies);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = lobbies.length.toString(36);
		lobbies.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ lobby }, res) {
		res.json(lobby);
	},

	/** PUT /:id - Update a given entity */
	update({ lobby, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				lobby[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ lobby }, res) {
		lobbies.splice(lobbies.indexOf(lobby), 1);
		res.sendStatus(204);
	}
});
