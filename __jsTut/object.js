const person = {
  key: "value", // 프로퍼티 (객체 프로퍼티)
  key1: 123,
  key2: true,
  key3: undefined,
  key4: [1, 2],
  key5: function () { },
  name: "동이",
  age: 26
}; // 객체 리터럴 방식


console.log(person.name); // 점 표기법 // ? 동이
console.log(person["name"]); // 괄호 표기법 // ? 동이


function getPropertyValue(key) {
  return person[key];
}
console.log(getPropertyValue("name")); // ? 동이


// 객체 프로퍼티 추가
person.location = "한국";
person["gender"] = "여성";
console.log(person);


// 객체 프로퍼티 수정
person.name = "이동이";
person["age"] = 10;
console.log(person);