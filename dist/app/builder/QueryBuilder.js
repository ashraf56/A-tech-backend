"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(SearchableFeilds) {
        var _a;
        const searchTerm = (_a = this.query) === null || _a === void 0 ? void 0 : _a.searchTerm; // search input
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: SearchableFeilds.map((field) => ({ [field]: { $regex: searchTerm, $options: 'i' } }))
            });
        }
        return this;
    }
    filter() {
        const objectQuries = Object.assign({}, this === null || this === void 0 ? void 0 : this.query);
        const removeQuery = ['searchTerm'];
        removeQuery.forEach((q) => delete objectQuries[q]);
        this.modelQuery = this.modelQuery.find(objectQuries);
        return this;
    }
}
exports.default = QueryBuilder;
