const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// exports.create = (req,res)=>
//     {
//         const {body}=req;
//         let adminToSave = new Admin(body);
//         adminToSave.save()
//         .then((success) => {
//             console.log("the new admin is : ", success);
//             res.send(success);
//         })
//         .catch((error) => {
//             console.log("admin not saved :( ", error);
//             res.status(400).send(error);
//         });
//     };
exports.register = async (req, res) => {
    try {
        let { body } = req;
        let admin = new Admin(body);
        let key = bcrypt.genSaltSync(10);
        admin.password = bcrypt.hashSync(body.password, key);
        let savedAdmin = await admin.save();
        res.send(savedAdmin);
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
};
exports.login = async (req, res) => {
    try {
        let { body } = req;
        let admin = await Admin.findOne({ email: body.email });
        if (!admin) {
            res.send('email or password is invalid');
        } else {
            let validPwd = bcrypt.compareSync(body.password, admin.password)
            if (!validPwd) {
                res.send('email or pwd invalid');
            } else {
                let payload = {
                    email: admin.email,
                    firstname: admin.firstname,
                    lastname: admin.lastname
                }
                let token = jwt.sign(payload, 'jaskey@246')
                res.send({ myToken: token });

            }
        }

    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
};
exports.findAll = (req, res) => {
    Admin.find()
        .then((success) => {
            console.log("all my admins are : ", success);
            res.send(success)
        })
        .catch((error) => {
            console.log(error);
            res.send(error)
        })
};

exports.findAdminById = (req, res) => {
    const { id } = req.params;
    Admin.findById({ _id: id })
        .then((success) => {
            console.log(`l'admin ${id} est :`, success);
            res.send(success)
        })
        .catch((error) => {
            console.log(error);
            res.send(error)
        })
}

exports.updateAdmin = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    Admin.findOneAndUpdate({ _id: id }, body)
        .then((success) => {
            console.log(`l'admin ${id} est modifié :) `, success);
            res.send(success)
        })
        .catch((error) => {
            res.send(error)
        })

}

exports.deleteAdmin = (req, res) => {
    const { id } = req.params;
    Admin.findOneAndDelete({ _id: id })
        .then((success) => {
            console.log(`l'admin ${id} est supprimé :) `, success);
            res.send(success)
        })
        .catch((error) => {
            res.send(error)
        })

}
