import 'package:flutter/material.dart';
import '../all.dart';


class ProblemsForm extends StatefulWidget {
  const ProblemsForm({Key? key}) : super(key: key);

  @override
  ProblemsFormState createState() {
    return ProblemsFormState();
  }
}

class ProblemsFormState extends State<ProblemsForm> {
  final _formKey = GlobalKey<FormState>();
  String dropdownValue = 'Choose Option';
  @override
  Widget build(BuildContext context) {
    return Form(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          DropdownButton<String>(
            value: dropdownValue,
            icon: const Icon(Icons.arrow_downward),
            iconSize: 24,
            elevation: 16,
            style: const TextStyle(color: Colors.white),
            underline: Container(
              height: 2,
              color: Colors.white,
            ),
            onChanged: (String? newValue) {
              setState(() {
                dropdownValue = newValue!;
              });
            },
            hint: const Text(
              "Select the problem",
              style: TextStyle(color: Colors.black38),
            ),
            items: [
              'Choose Option',
              'Never gonna give you up',
              'Never gonna let you down',
              'Never gonna make you cry',
              'Naver gonna say goodbye'
            ].map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
          Center(
            child: SizedBox(
              width: 400,
              child: TextFormField(
                decoration: const InputDecoration(
                    fillColor: Colors.white,
                    filled: true,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(8.0)),
                      borderSide: BorderSide(
                        color: Colors.white,
                        width: 1.0,
                      ),
                    ),
                    labelText: 'Insert Text',
                    labelStyle: TextStyle(color: Colors.black, fontSize: 24.0)),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a value';
                  }
                  return null;
                },
              ),
            ),
          ),
          Padding(
              padding: const EdgeInsets.symmetric(vertical: 24.0),
              child: ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('Processing Data')));
                    }
                  },
                  child: const Text('Submit')))
        ],
      ),
    );
  }
}

class ProblemsPage extends StatelessWidget {
  const ProblemsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        bottomNavigationBar: BottomNavDrawer(),
        drawer: NavDrawer(),
        appBar: NavAppBar(),
        body: const ProblemsForm());
  }
}
