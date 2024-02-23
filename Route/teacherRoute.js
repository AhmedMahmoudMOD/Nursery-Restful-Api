const express = require('express');
const teacherController = require("./../Controller/teacherController");
const {insertValidations,updateValidations} = require('../MiddleWares/Validations/TeacherValidations');
const validator = require('../MiddleWares/Validations/Validator');
const {isTeacher} = require('../MiddleWares/AuthMW');

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         fullname:
 *           type: string
 *           description: The teacher full name
 *         email:
 *           type: string
 *           description: The teacher email
 *         password:
 *           type: string
 *           description: The teacher password
 *         image:
 *           type: string
 *           description: The teacher image
 *     Message:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: the message description
 *             
 */


/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Returns the list of all the teachers
 *     tags : [Teachers]
 *     responses:
 *       200:
 *         description: The list of the teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get the teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The teacher data by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 *       404:
 *         description: The teacher id was not found
 */

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: add a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: The teacher was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teachers:
 *   put:
 *     summary: update teacher data
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: The teacher was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The teacher id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teachers:
 *   delete:
 *     summary: delete a teacher from the db
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: The teacher was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: The teacher id was not found
 *       500:
 *         description: internal server error
 */

/**
 * @swagger
 * /teachers/changepassword:
 *   post:
 *     summary: change the password
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              properties:
 *                  _id:
 *                      type: string
 *                      description: the teacher id
 *                  password:
 *                      type: string
 *                      description: the new password
 *     responses:
 *       200:
 *         description: The teacher was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       500:
 *         description: internal server error
 */

// Route Intialization //
const router = express.Router();

router.route('/teachers')
        .all(isTeacher)
        .get(teacherController.getAllTeachersData)
        .post(insertValidations,validator,teacherController.addNewTeacher)
        .put(updateValidations,validator,teacherController.updateTeacher)
        .delete(teacherController.deleteTeacher)

/* /teachers/id route  */
router.get('/teachers/:id([0-9a-fA-F]+)',teacherController.getTeacherByID)

/* /teachers/supervisors route  */
router.get('/teachers/supervisors',teacherController.getSupers)

/* /teachers/changepassword route  */
router.post('/teachers/changepassword',teacherController.changePassword)


module.exports=router;

