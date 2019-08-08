const Dev = require('./../models/Dev')

module.exports = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ message: `Dev does not exists` })
    }

    targetDev.dislikes.includes(loggedDev._id)


    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json({ ok: true })
  }
}
