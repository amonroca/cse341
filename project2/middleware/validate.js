const { checkSchema, validationResult, param } = require('express-validator');
const { ObjectId } = require('mongodb');

// Schemas validation

/// ==== Users validation ====
const createUserSchema = {
  name: {
    in: ['body'],
    isString: { errorMessage: 'name must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'name is required' },
    isLength: {
      options: { max: 50 },
      errorMessage: 'name must be at most 50 characters long'
    }
  },
  email: {
    in: ['body'],
    isEmail: { errorMessage: 'invalid email' },
    normalizeEmail: true,
    notEmpty: { errorMessage: 'email is required' }
  },
  role: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'role must be a string' },
    isIn: {
      options: [['student', 'instructor']],
      errorMessage: 'invalid role'
    }
  }
};

const updateUserSchema = {
  name: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'name must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'name must not be empty' },
    isLength: {
      options: { max: 50 },
      errorMessage: 'name must be at most 50 characters long'
    }
  },
  email: {
    in: ['body'],
    optional: true,
    isEmail: { errorMessage: 'invalid email' },
    normalizeEmail: true
  }
};

// Validators as middlewares
const createUserValidators = checkSchema(createUserSchema);
const updateUserValidators = checkSchema(updateUserSchema);
const idParamValidator = [
  param('id')
    .custom((value) => ObjectId.isValid(value))
    .withMessage('Invalid ID')
];

// Middleware to return validation errors
function handleValidationResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = {
  createUserValidators,
  updateUserValidators,
  idParamValidator,
  handleValidationResult,
};

// ==== Courses validation ====
const createCourseSchema = {
  courseCode: {
    in: ['body'],
    isString: { errorMessage: 'courseCode must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'courseCode is required' },
    isLength: {
      options: { max: 6 },
      errorMessage: 'courseCode must be at most 6 characters long'
    }
  },
  courseName: {
    in: ['body'],
    isString: { errorMessage: 'courseName must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'courseName is required' },
    isLength: {
        options: { max: 50 },
        errorMessage: 'courseName must be at most 50 characters long'
    }
  },
  description: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'description must be a string' },
    trim: true,
    isLength: {
      options: { max: 500 },
      errorMessage: 'description must be at most 500 characters long'
    }
  },
  credits: {
    in: ['body'],
    notEmpty: { errorMessage: 'credits is required' },
    isInt: { options: { min: 0, max: 6 }, errorMessage: 'credits must be an integer between 0 and 6' },
    toInt: true
  },
  instructorId: {
    in: ['body'],
    optional: true,
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: 'instructorId must be a valid ObjectId'
    },
  },
  semester: {
    in: ['body'],
    isString: { errorMessage: 'semester must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'semester is required' }
  },
  prerequisites: {
    in: ['body'],
    optional: true,
    isArray: { errorMessage: 'prerequisites must be an array' },
    custom: {
      options: (value) => Array.isArray(value) && value.every(id => ObjectId.isValid(id)),
      errorMessage: 'prerequisites must be an array of valid ObjectIds'
    },
  },
  enrolledStudents: {
    in: ['body'],
    optional: true,
    isArray: { errorMessage: 'enrolledStudents must be an array' },
    custom: {
        options: (value) => Array.isArray(value) && value.every(id => ObjectId.isValid(id)),
        errorMessage: 'enrolledStudents must be an array of valid ObjectIds'
    },
  }
};

const updateCourseSchema = {
  courseCode: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'courseCode must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'courseCode must not be empty' },
    isLength: {
      options: { max: 6 },
      errorMessage: 'courseCode must be at most 6 characters long'
    }
  },
  courseName: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'courseName must be a string' },
    trim: true,
    isLength: {
      options: { max: 50 },
      errorMessage: 'courseName must be at most 50 characters long'
    }
  },
  description: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'description must be a string' },
    trim: true,
    isLength: {
      options: { max: 500 },
      errorMessage: 'description must be at most 500 characters long'
    }
  },
  credits: {
    in: ['body'],
    optional: true,
    isInt: { options: { min: 0, max: 6 }, errorMessage: 'credits must be an integer between 0 and 6' },
    toInt: true
  },
  instructorId: {
    in: ['body'],
    optional: true,
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: 'instructorId must be a valid ObjectId'
    }
  },
  semester: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'semester must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'semester must not be empty' }
  },
  prerequisites: {
    in: ['body'],
    optional: true,
    isArray: { errorMessage: 'prerequisites must be an array' },
    custom: {
        options: (value) => Array.isArray(value) && value.every(id => ObjectId.isValid(id)),
        errorMessage: 'prerequisites must be an array of valid ObjectIds'
    },
  },
  enrolledStudents: {
    in: ['body'],
    optional: true,
    isArray: { errorMessage: 'enrolledStudents must be an array' },
    custom: {
        options: (value) => Array.isArray(value) && value.every(id => ObjectId.isValid(id)),
        errorMessage: 'enrolledStudents must be an array of valid ObjectIds'
    },
  }
};

const createCourseValidators = checkSchema(createCourseSchema);
const updateCourseValidators = checkSchema(updateCourseSchema);

module.exports.createCourseValidators = createCourseValidators;
module.exports.updateCourseValidators = updateCourseValidators;

// ==== Assignments validation ====
const createAssignmentSchema = {
  courseId: {
    in: ['body'],
    notEmpty: { errorMessage: 'courseId is required' },
    isString: { errorMessage: 'courseId must be a string' },
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: 'courseId must be a valid ObjectId'
    }
  },
  title: {
    in: ['body'],
    isString: { errorMessage: 'title must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'title is required' },
    isLength: { options: { max: 200 }, errorMessage: 'title must be at most 200 characters long' }
  },
  description: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'description must be a string' },
    trim: true,
    isLength: { options: { max: 2000 }, errorMessage: 'description must be at most 2000 characters long' }
  },
  dueDate: {
    in: ['body'],
    notEmpty: { errorMessage: 'dueDate is required' },
    isISO8601: { strict: true, strictSeparator: true, errorMessage: 'dueDate must be an ISO8601 date' }
  },
  maxScore: {
    in: ['body'],
    notEmpty: { errorMessage: 'maxScore is required' },
    isInt: { options: { min: 0, max: 10000 }, errorMessage: 'maxScore must be an integer between 0 and 10000' },
    toInt: true
  },
  submissions: {
    in: ['body'],
    optional: true,
    isArray: { errorMessage: 'submissions must be an array' },
    custom: {
        options: (value) => Array.isArray(value).every(submission => 
            ObjectId.isValid(submission.studentId) &&
            !isNaN(Date.parse(submission.submittedAt)) &&
            Number.isInteger(submission.score) &&
            submission.score >= 0 &&
            submission.score <= 10000 &&
            (typeof submission.feedback === 'undefined' || (typeof submission.feedback === 'string' && submission.feedback.length <= 2000))
        ),
        errorMessage: 'submissions must be an array of valid submission objects',
    }
  }
};

const updateAssignmentSchema = {
  courseId: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'courseId must be a string' },
    custom: {
      options: (value) => ObjectId.isValid(value),
      errorMessage: 'courseId must be a valid ObjectId'
    }
  },
  title: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'title must be a string' },
    trim: true,
    notEmpty: { errorMessage: 'title must not be empty' },
    isLength: { options: { max: 200 }, errorMessage: 'title must be at most 200 characters long' }
  },
  description: {
    in: ['body'],
    optional: true,
    isString: { errorMessage: 'description must be a string' },
    trim: true,
    isLength: { options: { max: 2000 }, errorMessage: 'description must be at most 2000 characters long' }
  },
  dueDate: {
    in: ['body'],
    optional: true,
    isISO8601: { strict: true, strictSeparator: true, errorMessage: 'dueDate must be an ISO8601 date' }
  },
  maxScore: {
    in: ['body'],
    optional: true,
    isInt: { options: { min: 0, max: 10000 }, errorMessage: 'maxScore must be an integer between 0 and 10000' },
    toInt: true
  },
  submissions: {
    in: ['body'],
    optional: true,
    isArray: { errorMessage: 'submissions must be an array' },
    custom: {
        options: (value) => Array.isArray(value).every(submission => 
            ObjectId.isValid(submission.studentId) &&
            !isNaN(Date.parse(submission.submittedAt)) &&
            Number.isInteger(submission.score) &&
            submission.score >= 0 &&
            submission.score <= 10000 &&
            (typeof submission.feedback === 'undefined' || (typeof submission.feedback === 'string' && submission.feedback.length <= 2000))
        ),
        errorMessage: 'submissions must be an array of valid submission objects',
    }
  }
};

const createAssignmentValidators = checkSchema(createAssignmentSchema);
const updateAssignmentValidators = checkSchema(updateAssignmentSchema);

module.exports.createAssignmentValidators = createAssignmentValidators;
module.exports.updateAssignmentValidators = updateAssignmentValidators;