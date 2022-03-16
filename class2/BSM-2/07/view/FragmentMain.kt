package com.mkielar.notepadbsm.view

import android.app.AlertDialog
import android.os.Bundle
import android.text.InputFilter
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.mkielar.notepadbsm.databinding.FragmentMainBinding
import com.mkielar.notepadbsm.viewmodel.NotepadViewModel


class FragmentMain : Fragment() {
    private lateinit var binding: FragmentMainBinding
    private val viewModel: NotepadViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentMainBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        requireContext().run {
            viewModel.setStorageProvider(SharedPreferencesStorage(requireContext()))

            binding.recycler.layoutManager = LinearLayoutManager(this)
            binding.recycler.adapter = NoteRecyclerAdapter(viewModel.getNotes()) { title ->
                findNavController().navigate(
                    FragmentMainDirections.actionFragmentMainToFragmentNotepad(
                        title
                    )
                )
            }

            binding.fab.setOnClickListener {
                val titleEditText = EditText(this)

                titleEditText.filters += InputFilter.LengthFilter(20)
                titleEditText.hint = "Name of the note"

                AlertDialog.Builder(this)
                    .setTitle("Create new note")
                    .setView(titleEditText)
                    .setPositiveButton("Create") { dialog, whichButton ->
                        findNavController().navigate(
                            FragmentMainDirections.actionFragmentMainToFragmentNotepad(
                                titleEditText.text.toString()
                            )
                        )
                    }
                    .setCancelable(true)
                    .show()
            }
        }
    }
}