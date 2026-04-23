const Grievance = require('../models/Grievance');

// Create a grievance
exports.createGrievance = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newGrievance = new Grievance({
      title,
      description,
      category,
      user: req.user.id
    });

    const grievance = await newGrievance.save();
    res.json(grievance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all grievances
exports.getGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find()
      .populate('user', ['name', 'email'])
      .sort({ date: -1 });
    res.json(grievances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a grievance by ID
exports.getGrievanceById = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id)
      .populate('user', ['name', 'email']);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    res.json(grievance);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update a grievance
exports.updateGrievance = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    let grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    // Optional Check: Only allow owner to update or add role-based guard here.
    // Assuming for simplicity any authenticated user or owner might update status.
    const updateFields = {};
    if(title) updateFields.title = title;
    if(description) updateFields.description = description;
    if(category) updateFields.category = category;
    if(status) updateFields.status = status;

    grievance = await Grievance.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(grievance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a grievance
exports.deleteGrievance = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }

    await Grievance.findByIdAndDelete(req.params.id);

    res.json({ message: 'Grievance removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Search grievances by title
exports.searchGrievances = async (req, res) => {
  try {
    const searchQuery = req.query.title;
    if (!searchQuery) {
      return res.status(400).json({ message: 'Search query title is required' });
    }

    const grievances = await Grievance.find({
      title: { $regex: searchQuery, $options: 'i' }
    }).populate('user', ['name', 'email']);

    res.json(grievances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
