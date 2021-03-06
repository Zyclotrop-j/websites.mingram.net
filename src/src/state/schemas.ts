import { observable, flow, computed, autorun } from 'mobx';
import Ajv from 'ajv';
import fetch from "./fetch";

export const ajv = new Ajv({ allErrors: true, nullable: true, unknownFormats: "ignore" });

export const schemas = observable([]);
export const loading = observable.box(false);
export const error = observable.box(null);

autorun(() => {
  console.log('schemas:', schemas);
});

export const fetchAllSchemas = flow(function*() {
  // <- note the star, this a generator function!
  schemas.clear();
  loading.set(true);
  try {
    const { data } = yield fetch(`https://zcmsapi.herokuapp.com/api/v1/schema`).then(i => i.json()); // yield instead of await
    ajv.removeSchema();
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].title === 'schema') {
        continue;
      }
      ajv.addSchema({ ...data[i], $id: undefined, id: undefined, $schema: undefined }, data[i].title);
    }
    schemas.replace(data);
    loading.set(false);
  } catch (err) {
    console.error('ERROR in fetchAllSchemas', err);
    schemas.clear();
    error.set(err);
    loading.set(false);
  }
});

export const componentschemas = computed(() => schemas.filter(i => i.title.startsWith('component')));
export const pageschema = computed(() => schemas.find(i => i.title === "page"));
export const websiteschema = computed(() => schemas.find(i => i.title === "website"));
export const themeschema = computed(() => schemas.find(i => i.title === "theme"));
