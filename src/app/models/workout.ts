import { Exercise } from './exercise';

export class Workout {
    workout_id: number;
    type_id: number;
    user_id: number;
    workout_visibility: number;
    workout_name: string;
    workout_description: string;
    queued_workout: number;
    exercises: Exercise[] = [];

    // constructor(id: number, type: number, user_id: number, visibility: number, name: string) {
    //     this.workout_id = id;
    //     this.type_id = type;
    //     this.user_id = user_id;
    //     this.visibility = visibility;
    //     this.workout_name = name;
    // }
}
