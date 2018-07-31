export class Exercise {
    exercise_id: number;
    exercise_name: string;
    type_id: number;
    exercise_description: string;
    exercise_sets: number;
    exercise_reps: number;
    exercise_duration: number;
    user_id: number;
    visibility: number;

    constructor (id: number, name: string, type: number, descr: string, sets: number,
        reps: number, dura: number, user: number, vis: number) {
            this.exercise_id = id;
            this.exercise_name = name;
            this.type_id = type;
            this.exercise_description = descr;
            this.exercise_sets = sets;
            this.exercise_reps = reps;
            this.exercise_duration = dura;
            this.user_id = user;
            this.visibility = vis;
        }
}
