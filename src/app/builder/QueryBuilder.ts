/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {

    public modelQuery: Query<T[], T>
    public query: Record<string, any>

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery
        this.query = query
    }

    search(SearchableFeilds: string[]) {
        const searchTerm = this.query?.searchTerm // search input

        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: SearchableFeilds.map((field) => (
                    { [field]: { $regex: searchTerm, $options: 'i' } }

                ) as FilterQuery<T>)
            })
        }
        return this
    }
    filter() {

        const objectQuries = { ...this?.query }
        const removeQuery = ['searchTerm']
        removeQuery.forEach((q) => delete objectQuries[q])

        this.modelQuery = this.modelQuery.find(objectQuries as FilterQuery<T>)

        return this
    }

}

export default QueryBuilder