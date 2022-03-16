package com.example.myapp01.ui.main

import android.content.Context
import android.content.SharedPreferences
import android.graphics.BitmapFactory
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import com.example.myapp01.MainApplication
import com.example.myapp01.R
import com.example.myapp01.databinding.MainFragmentBinding

class MainFragment : Fragment() {
    private val sharedViewModel: MainViewModel by activityViewModels()
    private var binding: MainFragmentBinding? = null


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val context = MainApplication.applicationContext()
        //sprawdza czy użytkownik nie ustawił swojego hasła jeśli nie - hasło początkowe ustawiane jest jako "password"
        var sharedPreferences = context.getSharedPreferences("PasswordU", Context.MODE_PRIVATE)
        val pass = sharedPreferences.getString("PasswordU", "")
        if (pass!!.length == 0){
            var sharedPreferences = context.getSharedPreferences("Password", Context.MODE_PRIVATE)

            val editor: SharedPreferences.Editor = sharedPreferences.edit()

            editor.putString("Password", "password").apply()

        }

        val fragmentBinding = MainFragmentBinding.inflate(inflater, container, false)
        binding = fragmentBinding
        return fragmentBinding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding?.apply {
            lifecycleOwner = viewLifecycleOwner
            viewModel = sharedViewModel
            mainFragment = this@MainFragment
        }
    }
    fun EditText.StringValue()= text.toString()
    fun comparison(){
        val context = MainApplication.applicationContext()
        var sharedPreferences = context.getSharedPreferences("PasswordU", Context.MODE_PRIVATE)
        val pass = sharedPreferences.getString("PasswordU", "")
        //sprawdza czy użytkownik zdążył już ustawić swoje hasło, jeśli tak - jest sprawdzana jego poprawność
        if (pass!!.length != 0) {
            if (binding!!.editTextTextPassword.StringValue().equals(pass)) {
                Toast.makeText(activity, "Podano prawidłowe hasło", Toast.LENGTH_LONG).show()
                findNavController().navigate(R.id.action_mainFragment_to_fragment2)
            }
        }
            // jeśli użytkownik nie ustawił swojego hasła jest sprawdzana poprawność wyżej ustawionego domyślnego hasła
            else{
                var sharedPreferences2 = context.getSharedPreferences("Password", Context.MODE_PRIVATE)
                val pass2 = sharedPreferences2.getString("Password", "")
                if (binding!!.editTextTextPassword.StringValue().equals(pass2)){
                    Toast.makeText(activity, "Podano prawidłowe hasło", Toast.LENGTH_LONG).show()
                    findNavController().navigate(R.id.action_mainFragment_to_fragment2)
                }
            }
        }
    }
