import { Router } from "express";
import asyncHandler from "express-async-handler";
import { body, param, validationResult } from "express-validator";

import authController from "../controllers/authController";
import clientController from "../controllers/clientController";
import employeeController from "../controllers/employeeController";
import departmentController from "../controllers/departmentController";
import roleController from "../controllers/roleController";

import { verifyToken } from "../middleware/authMiddleware";

/**
 * Middleware to handle validation results.
 */
const validate = (validations: any[]) => {
  return asyncHandler(async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  });
};

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                   AUTH                                     */
/* -------------------------------------------------------------------------- */

router.post(
  "/auth/login",
  validate([
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ]),
  asyncHandler(authController.login)
);

/* -------------------------------------------------------------------------- */
/*                                 CLIENTS                                    */
/* -------------------------------------------------------------------------- */

router.use("/clients", verifyToken);

router.get(
  "/clients",
  asyncHandler(clientController.getAllClients)
);

router.get(
  "/clients/:id",
  validate([param("id").isInt().toInt()]),
  asyncHandler(clientController.getClientById)
);

router.post(
  "/clients",
  validate([
    body("name").isString().notEmpty(),
    body("email").optional().isEmail(),
    body("phone").optional().isString(),
    body("address").optional().isString(),
  ]),
  asyncHandler(clientController.createClient)
);

router.put(
  "/clients/:id",
  validate([
    param("id").isInt().toInt(),
    body("name").optional().isString(),
    body("email").optional().isEmail(),
    body("phone").optional().isString(),
    body("address").optional().isString(),
  ]),
  asyncHandler(clientController.updateClient)
);

router.delete(
  "/clients/:id",
  validate([param("id").isInt().toInt()]),
  asyncHandler(clientController.deleteClient)
);

/* -------------------------------------------------------------------------- */
/*                               EMPLOYEES                                    */
/* -------------------------------------------------------------------------- */

router.use("/employees", verifyToken);

router.get(
  "/employees",
  asyncHandler(employeeController.getAllEmployees)
);

router.get(
  "/employees/:id",
  validate([param("id").isInt().toInt()]),
  asyncHandler(employeeController.getEmployeeById)
);

router.post(
  "/employees",
  validate([
    body("firstName").isString().notEmpty(),
    body("lastName").isString().notEmpty(),
    body("email").isEmail(),
    body("phone").optional().isString(),
    body("departmentId")
      .isInt()
      .toInt()
      .withMessage("departmentId must be an integer"),
    body("roleId").isInt().toInt().withMessage("roleId must be an integer"),
  ]),
  asyncHandler(employeeController.createEmployee)
);

router.put(
  "/employees/:id",
  validate([
    param("id").isInt().toInt(),
    body("firstName").optional().isString(),
    body("lastName").optional().isString(),
    body("email").optional().isEmail(),
    body("phone").optional().isString(),
    body("departmentId").optional().isInt().toInt(),
    body("roleId").optional().isInt().toInt(),
  ]),
  asyncHandler(employeeController.updateEmployee)
);

router.delete(
  "/employees/:id",
  validate([param("id").isInt().toInt()]),
  asyncHandler(employeeController.deleteEmployee)
);

/* -------------------------------------------------------------------------- */
/*                             DEPARTMENTS                                    */
/* -------------------------------------------------------------------------- */

router.use("/departments", verifyToken);

router.get(
  "/departments",
  asyncHandler(departmentController.getAllDepartments)
);

router.get(
  "/departments/:id",
  validate([param("id").isInt().toInt()]),
  asyncHandler(departmentController.getDepartmentById)
);

router.post(
  "/departments",
  validate([body("name").isString().notEmpty()]),
  asyncHandler(departmentController.createDepartment)
);

router.put(
  "/departments/:id",
  validate([
    param("id").isInt().toInt(),
    body("name").optional().isString(),
  ]),
  asyncHandler(departmentController.updateDepartment)
);

router.delete(
  "/departments/:id",
  validate([param("id").isInt().toInt()]),
  asyncHandler(departmentController.deleteDepartment)
);

/* -------------------------------------------------------------------------- */
/*                                 ROLES                                      */
/* -------------------------------------------------------------------------- */

router.use("/roles", verifyToken);

router.get(
  "/roles",
  asyncHandler(roleController.getAllRoles)
);

router.get(
  "/roles/:id",
  validate([param("id").isInt().toInt()]),
  asyncHandler(roleController.getRoleById)
);

router.post(
  "/roles",
  validate([body("title").isString().notEmpty()]),
  asyncHandler(roleController.createRole)
);

router.put(
  "/roles/:id",
  validate([
    param("id").isInt().toInt(),
    body("title").optional().isString(),
  ]),
  asyncHandler(roleController.updateRole)
);

router.delete(
  "/roles/:id",
  validate([param("id").isInt().toInt()]),
  asyncHandler(roleController.deleteRole)
);

export default router;