import Event from "App/Models/Event";
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

export default class SavesController {
  public async index() {
    const events = await Event.all();
    if (events.length > 0) {
      return events[0].text;
    }

    return [];
  }

  public async save({request}: HttpContextContract) {
    const body = request.body();
    const events = await Event.all();
    let event = new Event();
    if (events.length > 0) {
      event = events[0];
    }

    event.text = JSON.stringify(body);
    await event.save();
  }
}
