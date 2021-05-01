// CPP program to implement traveling salesman
// problem using naive approach.
// #include <bits/stdc++.h>
#include <cstdint>
#include <cstddef>
#include <iostream>
#include <cstring>
#include<vector>

#include <emscripten.h>
using namespace std;
 
// implementation of traveling Salesman Problem
uint32_t travllingSalesmanProblem(uint32_t** graph, int*route, uint32_t s, uint32_t min_path, uint32_t V)
{
    // store all vertex apart from source vertex
    vector<int> vertex;
    for (uint32_t i = 0; i < V; i++)
        if (i != s)
            vertex.push_back(i);
 
    // store minimum weight Hamiltonian Cycle.
    do {
        // store current Path weight(cost)
        uint32_t current_pathweight = 0;
 
        // compute current path weight
        uint32_t k = s;
        for (uint32_t i = 0; i < vertex.size(); i++) {
            if (graph[k][vertex[i]] == -1)
            {
                current_pathweight = INT32_MAX;
            } else if (current_pathweight < INT32_MAX){
                current_pathweight += graph[k][vertex[i]];
            }
            k = vertex[i];
        }
 
        // update minimum
        min_path = min(min_path, current_pathweight);
        if (min_path == current_pathweight) {
            route[0] = s;
            for (uint32_t i = 1; i < V; i++)
            {
                route[i] = vertex[i-1];
            }
        }
 
    } while (
        next_permutation(vertex.begin(), vertex.end()));
    
 
    return min_path;
}

extern "C" {
    uint32_t findbest(uint32_t** graph, int*route, uint32_t V){
    uint32_t min_path = INT_MAX;
    for (uint32_t s = 0; s < V; s++)
    {
        min_path = travllingSalesmanProblem(graph, route, s, min_path, V);
        // printf("Min-path: %i - Ruta:", min_path);
        // for (uint32_t i = 0; i < V; i++)
        // {
        //     printf("%c", lista[route[i]]);
        // }
        // printf("\n");
    }
    return min_path;
    }
}
 
// // Driver Code
// int main()
// {
//     // matrix representation of graph
//     int graph[][7] = { { 0 , 10,-1, 8 , 7 ,-1, -1 }, //A
//                        { 10, 0 , 12, 7 , -1, -1, -1 }, //B
//                        { -1, 12, 0 , 6 , -1, 7 ,  5 }, //C
//                        { 8 , 7 , 6 , 0 , 9 , 4 , -1 }, //d
//                        { 7 , -1, -1, 9 , 0 , -1, 11 },// E
//                        { -1, -1, 7 , 4 , -1, 0 ,  3 }, //F
//                        { -1, -1, 5 , -1, 11, 3 ,  0 } //G
//                     };
                
//     int* route = (int *)calloc(V, sizeof(int));
//     cout << findbest(graph, route) << endl;
//     free(route);
//     return 0;
// }