const mongoose = require('mongoose');
const Course = require('./schema/createCourse')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


async function createCourse(l) {
    const course = new Course({
        name: 'Test Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    })
     await course.save();
    console.log('Course created...')
    console.log(course)
}

async function getCourses() {
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log('Courses retrieved')
    console.log(courses)

}

createCourse();
getCourses();

